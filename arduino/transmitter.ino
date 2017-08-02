#include <VirtualWire.h>

int trigPin = 11;    //Trig - green Jumper
int echoPin = 10;    //Echo - yellow Jumper
long duration, cm, inches;

void setup()
{
  pinMode(13, OUTPUT);
  Serial.begin(9600);   // Debugging only
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  vw_set_ptt_inverted(true); // Required for DR3100
  vw_set_tx_pin(12);
  vw_setup(4000);      // Bits per sec
}

void loop()
{
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read the signal from the sensor: a HIGH pulse whose
  // duration is the time (in microseconds) from the sending
  // of the ping to the reception of its echo off of an object.
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH);

  // convert the time into a distance
  cm = (duration / 2) / 29.1;
  Serial.print(cm);
  Serial.println();

  char tt[7];
  dtostrf(cm, 7, 0, tt); //Double to string
  digitalWrite(13, true); // Flash a light to show transmitting
  
  vw_send((uint8_t *)tt, strlen(tt)); //computes the length of the string
  vw_wait_tx(); // Wait until the whole message is gone
  digitalWrite(13, false);
  
  delay(2000);
}