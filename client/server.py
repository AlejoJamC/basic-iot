#!/usr/bin/python

import httplib, urllib

# import Adafruit_DHT

# Raspberry Params
# Raspberry ID
rasp_id = 1
# Bearer token assigned to this raspberry
auth_token = ""

# Adafruit_DHT.DHT22
# sensor = Adafruit_DHT.DHT22

# Raspberry Pi connected to GPIO23.
pin = 23

# varaibles sensor values
# humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
humedity = 66.8
temperature = 27.5

'''
# Return
if humidity is not None and temperature is not None:
    print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
else:
    print('Failed to get reading. Try again!')
'''

# Connect to basic iot - server
# Endpoint /perifericos/:id Method: POST
# Connection to server IP
conn = httplib.HTTPSConnection("")
# Assigne body values
params = urllib.urlencode({
    '@temperatura': temperature,
    "@humedad": humedity,
    "hardwareId": rasp_id
})
# Declare headers
headers = {
    "Content-type" : "application/x-www-form-urlencoded",
    "Authorization" : "Bearer " + auth_token
}
# Request
conn.request("POST", "", params, headers)
# Response details
response = conn.getresponse()
print response.status, response.reason
data = response.read()
print data
conn.close()