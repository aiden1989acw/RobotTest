#!/usr/bin/python3
from time import sleep
from serial import Serial
import struct
import time
import sys
import json

class LX16A:
  LED_OFF = 1
  LED_ON = 0
  LED_ERROR_NONE = 0
  LED_ERROR_OVER_TEMPERATURE = 1
  LED_ERROR_OVER_VOLTAGE = 2
  LED_ERROR_OVER_TEMPERATURE_AND_VOLTAGE = 3
  LED_ERROR_LOCK_ROTOR = 4
  LED_ERROR_OVER_TEMPERATE_AND_STALLED = 5
  LED_ERROR_OVER_VOLTAGE_AND_STALLED = 6
  LED_ERROR_OVER_ALL = 7
  SERVO_FRAME_HEADER = 0x55
  SERVO_MOVE_TIME_WRITE = 1
  SERVO_MOVE_TIME_READ = 2
  SERVO_MOVE_TIME_WAIT_WRITE = 7
  SERVO_MOVE_TIME_WAIT_READ = 8
  SERVO_MOVE_START = 11
  SERVO_MOVE_STOP = 12
  SERVO_ID_WRITE = 13
  SERVO_ID_READ = 14
  SERVO_ANGLE_OFFSET_ADJUST = 17
  SERVO_ANGLE_OFFSET_WRITE = 18
  SERVO_ANGLE_OFFSET_READ = 19
  SERVO_ANGLE_LIMIT_WRITE = 20
  SERVO_ANGLE_LIMIT_READ = 21
  SERVO_VIN_LIMIT_WRITE = 22
  SERVO_VIN_LIMIT_READ = 23
  SERVO_TEMP_MAX_LIMIT_WRITE = 24
  SERVO_TEMP_MAX_LIMIT_READ = 25
  SERVO_TEMP_READ = 26
  SERVO_VIN_READ = 27
  SERVO_POS_READ = 28
  SERVO_OR_MOTOR_MODE_WRITE = 29
  SERVO_OR_MOTOR_MODE_READ = 30
  SERVO_LOAD_OR_UNLOAD_WRITE = 31
  SERVO_LOAD_OR_UNLOAD_READ = 32
  SERVO_LED_CTRL_WRITE = 33
  SERVO_LED_CTRL_READ = 34
  SERVO_LED_ERROR_WRITE = 35
  SERVO_LED_ERROR_READ = 36

# declaration of the connection object at serial port
  def __init__(self, Port=sys.argv[3], Baudrate=115200, Timeout=0.001):
     self.serial = Serial(Port, baudrate=Baudrate, timeout=Timeout)
     self.serial.setDTR(1)
     self.TX_DELAY_TIME = 0.00002
     self.Header = struct.pack("<BB", 0x55, 0x55)

# send packet add header and checksum
  def sendPacket(self, packet):
     sum = 0
     for item in packet:
        sum = sum + item
     fullPacket = bytearray(self.Header + packet +
                            struct.pack("<B", (~sum) & 0xff))
     self.serial.write(fullPacket)
     sleep(self.TX_DELAY_TIME)

# need to add exception and retry to the case if the checksum is not good
# also check good ID and order in return
  def sendReceivePacket(self, packet, receiveSize):
     t_id = packet[0]
     t_command = packet[2]
     self.serial.flushInput()
     self.serial.timeout = 0.1
     self.sendPacket(packet)
     r_packet = self.serial.read(receiveSize+3)
#     print(r_packet)
     return r_packet

# Move the servo between 0 and 1000 ie 0.24 degree resolution
# rate is in ms from 0 (fast) to 30000 (slow)
  def moveServo(self, id, position, rate):
     packet = struct.pack("<BBBHH", id, 7,
                          self.SERVO_MOVE_TIME_WRITE,
                          position, rate)
     self.sendPacket(packet)

# Read angle and rate send by moveServo
# angle is between 0 and 1000 siot 0.24 degree resolution
# rate is in ms from 0 (fast) to 30000 (slow)
  def readServoTarget(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_MOVE_TIME_READ)
     rpacket = self.sendReceivePacket(packet, 7)
     s = struct.unpack("<BBBBBHHB", rpacket)
     print(s)
     return s[5:7]

# Move the servo between 0 and 1000 ie 0.24 degree resolution
  # rate is in ms from 0 (fast) to 30000 (slow)
  # **** Wait for the command SERVO_MOVE_STOP
  def moveServoWait(self, id, position, rate):
     packet = struct.pack("<BBBHH", id, 7,
                          self.SERVO_MOVE_TIME_WAIT_WRITE,
                          position, rate)
     self.sendPacket(packet)

# Read angle and rate send by moveServoWait
  # angle is between 0 and 1000 siot 0.24 degree resolution
  # rate is in ms from 0 (fast) to 30000 (slow)
  def readServoTargetWait(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_MOVE_TIME_WAIT_READ)
     rpacket = self.sendReceivePacket(packet, 7)
     s = struct.unpack("<BBBBBHHB", rpacket)
#     print(s)
     return s[5:7]

# Share an order from moveServoWait
  def moveServoStart(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_MOVE_START)
     rpacket = self.sendPacket(packet)

# Offer a command from moveServoWait
  def moveServoStop(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_MOVE_STOP)
     rpacket = self.sendPacket(packet)

# change the servo ID
  def setID(self, id, newid):
     packet = struct.pack("<BBBB", id, 4,
                          self.SERVO_ID_WRITE, newid)
     self.sendPacket(packet)

# Read servo ID
  # value 254 returns the servo ID but a servo is needed.
  def readID(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_ID_READ)
     rpacket = self.sendReceivePacket(packet, 4)
     s = struct.unpack("<BBBBBBB", rpacket)
#     print(s)
     return s[5]

# Change the offset of the angle without saving it at the next power ON
  # Angle between -125 and 125
  def setAngleOffsetAdjust(self, id, angle):
     packet = struct.pack("<BBBb", id, 4,
                          self.SERVO_ANGLE_OFFSET_ADJUST, angle)
     self.sendPacket(packet)


# Change the offset of the angle in a permanent way
  # Angle between -125 and 125
  def setAngleOffset(self, id, angle):
     packet = struct.pack("<BBBb", id, 4,
                          self.SERVO_ANGLE_OFFSET_WRITE, angle)
     self.sendPacket(packet)

# read the offset of the angle
# angle between -125 and 125
  def readAngleOffset(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_ANGLE_OFFSET_READ)
     rpacket = self.sendReceivePacket(packet, 4)
     s = struct.unpack("<BBBBBbB", rpacket)
#     print(s)
     return s[5]

# Set the minimum and maximum angle of the servo
# Angle is between 0 and 1000 Resolution of 0.24 degree
  def setAngleLimit(self, id, angleMin, angleMax):
     packet = struct.pack("<BBBHH", id, 7,
                          self.SERVO_ANGLE_LIMIT_WRITE, angleMin, angleMax)
     self.sendPacket(packet)

# Read the minimum and maximum limit of the allowed angle
  def readAngleLimit(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_ANGLE_LIMIT_READ)
     rpacket = self.sendReceivePacket(packet, 7)
     s = struct.unpack("<BBBBBHHB", rpacket)
#     print(s)
     return s[5:7]

# Define the minimum and maximum operating voltage of the servo
# the values ​​are in mv min = 6500 max = 10000
  def setVoltageLimit(self, id, voltageMin, voltageMax):
     packet = struct.pack("<BBBHH", id, 7, self.SERVO_VIN_LIMIT_WRITE,
                          voltageMin, voltageMax)
     rpacket = self.sendPacket(packet)

# Read the minimum and maximum operating voltage of the servo
# the values ​​are in mv min = 6500 max = 10000
  def readVoltageLimit(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_VIN_LIMIT_READ)
     rpacket = self.sendReceivePacket(packet, 7)
     s = struct.unpack("<BBBBBHHB", rpacket)
#     print(s)
     return s[5:7]

# Set the maximum operating temperature in celsius
# default is 85 celsius between 50 and 100 celsius
  def setTemperatureLimit(self, id, temperatureMax):
     packet = struct.pack("<BBBB", id, 4, self.SERVO_TEMP_MAX_LIMIT_WRITE,
                          temperatureMax)
     rpacket = self.sendPacket(packet)

# Read the maximum temperature limit in celsius
  def readTemperatureLimit(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_TEMP_MAX_LIMIT_READ)
     rpacket = self.sendReceivePacket(packet, 4)
#     print(rpacket)
     s = struct.unpack("<BBBBBBB", rpacket)
#     print(s)
#     print("temp Limit is ",s[5])
     return s[5]

# Read the temperature in degree C
  def readTemperature(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_TEMP_READ)
     rpacket = self.sendReceivePacket(packet, 4)
#     print(rpacket)
     s = struct.unpack("<BBBBBBB", rpacket)
#     print(s)
#     print("temp is ",s[5])
     return s[5]

# Read the supply voltage of the servo
# The value is in mv
  def readVoltage(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_VIN_READ)
     rpacket = self.sendReceivePacket(packet, 5)
     s = struct.unpack("<BBBBBHB", rpacket)
     return s[5]

# Read the position of the servo
# the value can be negative so it's signed short
  def readPosition(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_POS_READ)
     rpacket = self.sendReceivePacket(packet, 5)
     s = struct.unpack("<BBBBBhB", rpacket)
     return s[5]

# Motor move with speed motorMode = 1 MotorSpeed ​​= rate
# otherwise set servo mode => motorMode = 0
  def motorOrServo(self, id, motorMode, MotorSpeed):
     packet = struct.pack("<BBBBBh", id, 7,
                          self.SERVO_OR_MOTOR_MODE_WRITE,
                          motorMode, 0, MotorSpeed)
     self.sendPacket(packet)

# Read the mode of servo
  def readMotorOrServo(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_OR_MOTOR_MODE_READ)
     rpacket = self.sendReceivePacket(packet, 7)
     s = struct.unpack("<BBBBBBBhB", rpacket)
 #    print(s)
     return [s[5], s[7]]

# Activate or deactivate the Motor
# 0 = motor OFF 1 = active motor
  def LoadUnload(self, id, mode):
     packet = struct.pack("<BBBB", id, 4,
                          self.SERVO_LOAD_OR_UNLOAD_WRITE, mode)
     self.sendPacket(packet)

# Read the activation status of the servo
  def readLoadUnload(self, id):
     packet = struct.pack("<BBB", id, 3,
                          self.SERVO_LOAD_OR_UNLOAD_READ)
     rpacket = self.sendReceivePacket(packet, 4)
     s = struct.unpack("<BBBBBBB", rpacket)
 #    print(s)
     return s[5]

# Enable or Disable the LED
# 0 = ON  => self.LED_ON
# 1 = OFF => self.LED_OFF
  def setLed(self, id, ledState):
     packet = struct.pack("<BBBB", id, 4,
                          self.SERVO_LED_CTRL_WRITE, ledState)
     self.sendPacket(packet)

# Read the activation status of the LED
# 0 = LED active
# 1 = LED OFF
  def readLed(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_LED_CTRL_READ)
     rpacket = self.sendReceivePacket(packet, 4)
     s = struct.unpack("<BBBBBBB", rpacket)
 #    print(s)
     return s[5]

# Activate an error on the alarm LED
  def setLedError(self, id, ledError):
     packet = struct.pack("<BBBB", id, 4,
                          self.SERVO_LED_ERROR_WRITE, ledError)
     self.sendPacket(packet)

# Read an Erro on the alarm LED
  def readLedError(self, id):
     packet = struct.pack("<BBB", id, 3, self.SERVO_LED_ERROR_READ)
     rpacket = self.sendReceivePacket(packet, 4)
     s = struct.unpack("<BBBBBBB", rpacket)
 #    print(s)
     return s[5]
#Poll servos for ID, Temperature, Position and Voltage
def pollServo(i):
        id = (f"{servo.readID(i)}")
        temperature = (f"{servo.readTemperature(i)}")
        position = (f"{servo.readPosition(i)}")
        voltage = (f"{servo.readVoltage(i)/1000}")

        sys.stdout.write(json.dumps (id + ' ' + temperature + ' ' + position + ' ' + voltage))
        
# Load all servos from LX16A class
servo = LX16A()
servoNum = int(sys.argv[1])
servoPos = int(sys.argv[2])
pollServo(servoNum)








