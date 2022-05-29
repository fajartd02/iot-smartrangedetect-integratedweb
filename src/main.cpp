#include <Arduino.h>
#include <WiFi.h>

String wifiSSID = "WULAN";
String wifiPassword = "21mei2002";

void setup() {
  Serial.begin(9600);
  Serial.println("Connecting to Wifi!");
  WiFi.begin(wifiSSID.c_str(), wifiPassword.c_str());

  while(WiFi.status() != WL_CONNECTED) {
    Serial.println(".");
    delay(500);
  }
  Serial.println("Wifi Connnected!");

}

void loop() {
  // put your main code here, to run repeatedly:
}