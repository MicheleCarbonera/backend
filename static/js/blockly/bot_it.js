'use strict';

goog.provide('Blockly.Msg.it');

goog.require('Blockly.Msg');

Blockly.Msg.CODERBOT_MOVE_FORWARD = "muovi avanti";
Blockly.Msg.CODERBOT_MOVE_BACKWARD = "muovi indietro";
Blockly.Msg.CODERBOT_MOVE_LEFT = "gira a sinistra";
Blockly.Msg.CODERBOT_MOVE_RIGHT = "gira a destra";
Blockly.Msg.CODERBOT_MOVE_ADV_MOVE = "muovi bot";
Blockly.Msg.CODERBOT_MOVE_MOTION_MOVE = "muovi bot (motion)";
Blockly.Msg.CODERBOT_MOVE_MOTION_TURN = "gira bot (motion)";
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR = "avvia motori";
Blockly.Msg.CODERBOT_MOVE_ADV_SPEED = "a velocità"
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR_SPEED_LEFT = "velocità sinistra"
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR_SPEED_RIGHT = "velocità destra"
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR_STEPS_LEFT = "step sinistra"
Blockly.Msg.CODERBOT_MOVE_ADV_MOTOR_STEPS_RIGHT = "step destra"
Blockly.Msg.CODERBOT_MOVE_ADV_ELAPSE = "per"
Blockly.Msg.CODERBOT_MOVE_MOTION_DIST = "distanza"
Blockly.Msg.CODERBOT_MOVE_MOTION_ANGLE = "angolo"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_FORWARD = "avanti"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_BACKWARD = "indietro"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_RIGHT = "destra"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_LEFT = "sinistra"
Blockly.Msg.CODERBOT_MOVE_ADV_TIP_TAIL= " a velocità (0-100%) per tempo (secondi)"
Blockly.Msg.CODERBOT_MOVE_MOTION_MOVE_TIP = "muovi bot, usando la camera per il posizionamento"
Blockly.Msg.CODERBOT_MOVE_MOTION_TURN_TIP = "gira il bot, usando la camera per il posizionamento"
Blockly.Msg.CODERBOT_MOVE_STOP = "stop";
Blockly.Msg.CODERBOT_SAY = "pronuncia in";
Blockly.Msg.CODERBOT_LOCALE_EN = "Inglese";
Blockly.Msg.CODERBOT_LOCALE_IT = "Italiano";
Blockly.Msg.CODERBOT_LOCALE_FR = "Francese";
Blockly.Msg.CODERBOT_LOCALE_ES = "Spagnolo";
Blockly.Msg.CODERBOT_PHOTO_TAKE = "scatta foto";
Blockly.Msg.CODERBOT_VIDEO_REC = "registra video";
Blockly.Msg.CODERBOT_VIDEO_STOP = "stop video";
Blockly.Msg.CODERBOT_SLEEP = "attendi";
Blockly.Msg.CODERBOT_SENSOR_PATHAHEAD = "spazio libero";
Blockly.Msg.CODERBOT_SENSOR_FINDLINE = "trova linea";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE = "trova faccia";
Blockly.Msg.CODERBOT_SENSOR_FINDSIGNAL = "trova segnale";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_FIND = "trova";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_COLOR = "da colore";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_DIST = "distanza";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_ANGLE = "angolo";
Blockly.Msg.CODERBOT_SENSOR_FINDCOLOR_BOTH = "entrambi";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_X = "x (ascissa)";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_Y = "y (ordinata)";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_SIZE = "dimensione";
Blockly.Msg.CODERBOT_SENSOR_FINDFACE_ALL = "x, y, dimensione (come lista)";
Blockly.Msg.CODERBOT_SENSOR_FINDLOGO = "trova logo";
Blockly.Msg.CODERBOT_SENSOR_FINDCLASS = "trova classe";
Blockly.Msg.CODERBOT_SENSOR_AVERAGE = "valore medio immagine";
Blockly.Msg.CODERBOT_SENSOR_AVERAGE_HUE = "Tinta";
Blockly.Msg.CODERBOT_SENSOR_AVERAGE_SATURATION = "Saturazione";
Blockly.Msg.CODERBOT_SENSOR_AVERAGE_VALUE = "Luminosità";
Blockly.Msg.CODERBOT_SENSOR_AVERAGE_ALL = "HSV (come lista)";
Blockly.Msg.CODERBOT_SENSOR_FINDTEXT_FIND = "trova testo formato da";
Blockly.Msg.CODERBOT_SENSOR_FINDTEXT_ACCEPT_ALPHA = "Lettere (A..Z)";
Blockly.Msg.CODERBOT_SENSOR_FINDTEXT_ACCEPT_NUM = "Numeri (0..9)";
Blockly.Msg.CODERBOT_SENSOR_FINDTEXT_ACCEPT_ALPHANUM = "Lettere e numeri (A..Z;0..9)";
Blockly.Msg.CODERBOT_SENSOR_FINDTEXT_ACCEPT_UNSPEC = "Qualsiasi";
Blockly.Msg.CODERBOT_SENSOR_FINDTEXT_COLOR = "colore sfondo";
Blockly.Msg.CODERBOT_SENSOR_FINDQRCODE = "leggi Bar/QRCode";
Blockly.Msg.CODERBOT_SENSOR_FINDARCODE = "leggi AR Code";
Blockly.Msg.CODERBOT_AUDIO_RECORD_FILE_NAME = "registra audio su file";
Blockly.Msg.CODERBOT_AUDIO_RECORD_FILE_ELAPSE = " per secondi";
Blockly.Msg.CODERBOT_AUDIO_PLAY_FILE = "riproduci file";
Blockly.Msg.CODERBOT_AUDIO_HEAR = "senti suono";
Blockly.Msg.CODERBOT_AUDIO_HEAR_LEVEL = " di volume";
Blockly.Msg.CODERBOT_AUDIO_HEAR_ELAPSE = "per secondi";
Blockly.Msg.CODERBOT_AUDIO_LISTEN = "ascolta";
Blockly.Msg.CODERBOT_AUDIO_LISTEN_MODEL_SIMPLE = "commandi semplici";
Blockly.Msg.CODERBOT_AUDIO_LISTEN_MODEL_MEDIUM = "commandi medi";
Blockly.Msg.CODERBOT_AUDIO_LISTEN_MODEL_ADV = "comandi avanzati";
Blockly.Msg.CODERBOT_SONAR_GET_DISTANCE = "leggi distanza con sonar";
Blockly.Msg.CODERBOT_SONAR_SENSOR_1 = "1";
Blockly.Msg.CODERBOT_SONAR_SENSOR_2 = "2";
Blockly.Msg.CODERBOT_SONAR_SENSOR_3 = "3";
Blockly.Msg.CODERBOT_EVENT_WHEN = "quando";
Blockly.Msg.CODERBOT_EVENT_WITH = "con";
Blockly.Msg.CODERBOT_EVENT_PUBLISH = "pubblica";
Blockly.Msg.CODERBOT_EVENT_ON_TOPIC = "sul topic";
Blockly.Msg.CODERBOT_EVENT_GENERATOR = "genera eventi";
Blockly.Msg.CODERBOT_CONVERSATION_PARSE = "interpreta";
