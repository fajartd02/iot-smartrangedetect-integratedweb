#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

String wifiSSID = "WULANS";
String wifiPassword = "21mei2002";
HTTPClient http;
WiFiClient client;
unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

void connectWifi();
void getHttp();

void setup() {
  Serial.begin(9600);
  connectWifi();
  getHttp();
}

void loop() {
    
}

void getHttp() {
   if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;

      String serverPath = "http://192.168.100.89:5000/hello";
      
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverPath.c_str());
      
      // Send HTTP GET request
      int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}

void connectWifi() {
  Serial.println("Connecting to Wifi!");
  WiFi.begin(wifiSSID.c_str(), wifiPassword.c_str());

  while(WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("Wifi Connnected!");
  Serial.println(WiFi.localIP());
}