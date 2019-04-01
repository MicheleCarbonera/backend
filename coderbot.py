############################################################################
#    CoderBot, a didactical programmable robot.
#    Copyright (C) 2014, 2015 Roberto Previtera <info@coderbot.org>
#
#    This program is free software; you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation; either version 2 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License along
#    with this program; if not, write to the Free Software Foundation, Inc.,
#    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
############################################################################

import os
import time
import logging
import pigpio
import sonar
import mpu
from wheelsaxel import WheelsAxel

# GPIO
# motors
PIN_MOTOR_ENABLE = 22
PIN_LEFT_FORWARD = 25
PIN_LEFT_BACKWARD = 24
PIN_RIGHT_FORWARD = 4
PIN_RIGHT_BACKWARD = 17
#?
PIN_PUSHBUTTON = 11
# servo
PIN_SERVO_3 = 9
PIN_SERVO_4 = 10
# sonar
PIN_SONAR_1_TRIGGER = 18
PIN_SONAR_1_ECHO = 7
PIN_SONAR_2_TRIGGER = 18
PIN_SONAR_2_ECHO = 8
PIN_SONAR_3_TRIGGER = 18
PIN_SONAR_3_ECHO = 23
# encoder
PIN_ENCODER_LEFT_A = 14
PIN_ENCODER_LEFT_B = 6
PIN_ENCODER_RIGHT_A = 15
PIN_ENCODER_RIGHT_B = 12

# PWM
PWM_FREQUENCY = 100 #Hz
PWM_RANGE = 100 #0-100

class CoderBot(object):

    # pylint: disable=too-many-instance-attributes

    _pin_out = [PIN_MOTOR_ENABLE, PIN_LEFT_FORWARD, PIN_RIGHT_FORWARD, PIN_LEFT_BACKWARD, PIN_RIGHT_BACKWARD, PIN_SERVO_3, PIN_SERVO_4]

    def __init__(self, motor_trim_factor=1.0, encoder=True):
        self.pi = pigpio.pi('localhost')
        self.pi.set_mode(PIN_PUSHBUTTON, pigpio.INPUT)
        self._cb = dict()
        self._cb_last_tick = dict()
        self._cb_elapse = dict()
        self._encoder = encoder
        self._motor_trim_factor = motor_trim_factor
        self._twin_motors_enc = WheelsAxel(
            self.pi,
            enable_pin=PIN_MOTOR_ENABLE,
            left_forward_pin=PIN_LEFT_FORWARD,
            left_backward_pin=PIN_LEFT_BACKWARD,
            left_encoder_feedback_pin_A=PIN_ENCODER_LEFT_A,
            left_encoder_feedback_pin_B=PIN_ENCODER_LEFT_B,
            right_forward_pin=PIN_RIGHT_FORWARD,
            right_backward_pin=PIN_RIGHT_BACKWARD,
            right_encoder_feedback_pin_A=PIN_ENCODER_RIGHT_A,
            right_encoder_feedback_pin_B=PIN_ENCODER_RIGHT_B)
        self.motor_control = self._dc_enc_motor

        self._cb1 = self.pi.callback(PIN_PUSHBUTTON, pigpio.EITHER_EDGE, self._cb_button)

        for pin in self._pin_out:
            self.pi.set_PWM_frequency(pin, PWM_FREQUENCY)
            self.pi.set_PWM_range(pin, PWM_RANGE)

        self.sonar = [sonar.Sonar(self.pi, PIN_SONAR_1_TRIGGER, PIN_SONAR_1_ECHO),
                      sonar.Sonar(self.pi, PIN_SONAR_2_TRIGGER, PIN_SONAR_2_ECHO),
                      sonar.Sonar(self.pi, PIN_SONAR_3_TRIGGER, PIN_SONAR_3_ECHO)]

        try:
            self._ag = mpu.AccelGyro()
        except IOError:
            logging.info("MPU not available")

        #self.stop()
        self._is_moving = False

    the_bot = None

    def exit(self):
        self._cb1.cancel()
        if self._encoder:
            self._twin_motors_enc.cancel_callback()
        for s in self.sonar:
            s.cancel()

    @classmethod
    def get_instance(cls, motor_trim_factor=1.0, encoder=True):
        if not cls.the_bot:
            cls.the_bot = CoderBot(motor_trim_factor=motor_trim_factor, encoder=encoder)
        return cls.the_bot

    def move(self, speed=100, elapse=0, distance=0):
        self._motor_trim_factor = 1.0
        speed_left = min(100, max(-100, speed * self._motor_trim_factor))
        speed_right = min(100, max(-100, speed / self._motor_trim_factor))
        self.motor_control(speed_left=speed_left, speed_right=speed_right, time_elapse=elapse, target_distance=distance)

    def turn(self, speed=100, elapse=0):
        speed_left = min(100, max(-100, speed * self._motor_trim_factor))
        speed_right = -min(100, max(-100, speed / self._motor_trim_factor))
        self.motor_control(speed_left=speed_left, speed_right=speed_right, time_elapse=elapse)

    def turn_angle(self, speed=100, angle=0):
        z = self._ag.get_gyro_data()['z']
        self.turn(speed, elapse=0)
        while abs(z - self._ag.get_gyro_data()['z']) < angle:
            time.sleep(0.05)
            logging.info(self._ag.get_gyro_data()['z'])
        self.stop()

    def forward(self, speed=100, elapse=0, distance=0):
        self.move(speed=speed, elapse=elapse, distance=distance)

    def backward(self, speed=100, elapse=0, distance=0):
        self.move(speed=-speed, elapse=elapse, distance=distance)

    def left(self, speed=100, elapse=0):
        self.turn(speed=-speed, elapse=elapse)

    def right(self, speed=100, elapse=0):
        self.turn(speed=speed, elapse=elapse)

    def get_sonar_distance(self, sonar_id=0):
        return self.sonar[sonar_id].get_distance()

    def stop(self):
        if self._encoder:
            self._twin_motors_enc.stop()
        else:
            for pin in self._pin_out:
                self.pi.write(pin, 0)
        self._is_moving = False

    def is_moving(self):
        return self._is_moving

    def set_callback(self, gpio, callback, elapse):
        self._cb_elapse[gpio] = elapse * 1000
        self._cb[gpio] = callback
        self._cb_last_tick[gpio] = 0

    def sleep(self, elapse):
        logging.debug("sleep: %s", str(elapse))
        time.sleep(elapse)

    def _cb_button(self, gpio, level, tick):
        cb = self._cb.get(gpio)
        if cb:
            elapse = self._cb_elapse.get(gpio)
            if level == 0:
                self._cb_last_tick[gpio] = tick
            elif tick - self._cb_last_tick[gpio] > elapse:
                self._cb_last_tick[gpio] = tick
                logging.info("pushed: %d, %d", level, tick)
                cb()

    def halt(self):
        os.system('sudo halt')

    def restart(self):
        os.system('sudo /etc/init.d/coderbot restart')

    def reboot(self):
        os.system('sudo reboot')

    def _dc_enc_motor(self, speed_left=100, speed_right=100, time_elapse=0, target_distance=0):
        self._twin_motors_enc.control(power_left=speed_left,
                                      power_right=speed_right,
                                      time_elapse=time_elapse,
                                      target_distance=target_distance)
