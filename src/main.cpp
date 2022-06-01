#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#define echoPin  D1
#define trigPin  D2

long duration;
int distance;
String wifiSSID = "WULANS";
String wifiPassword = "21mei2002";
HTTPClient http;
WiFiClient client;
unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

void connectWifi();
// void getHttp();
void postHttp();
int range_result();

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
  connectWifi();
  // getHttp();
  postHttp();
}

void loop() {
  // delay(5000);
}

void postHttp() {
  String url = "http://192.168.100.89:5000/add";
  WiFiClient client;
  HTTPClient http;  
  String response;

  StaticJsonDocument<200> buff;
  String jsonParams;

  int resultSensor = range_result();
  buff["range"] = resultSensor;
  serializeJson(buff, jsonParams);
  Serial.println(jsonParams);
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

        StaticJsonDocument<1024> doc;
        deserializeJson(doc, payload);
        JsonObject obj = doc.as<JsonObject>();
        String data = obj["message"];
        Serial.println(data);
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

int range_result() {
  // Clears the trigPin condition
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin HIGH (ACTIVE) for 10 microseconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  // Calculating the distance
  distance = duration * 0.034 / 2; // Speed of sound wave divided by 2 (go and back)
  return distance;
}