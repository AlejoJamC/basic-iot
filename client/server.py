#!/usr/bin/python

# basic packages required
import httplib, urllib, json

# Adafruit library
import Adafruit_DHT

# Read json file "env.json"
env = json.loads(open('env.json').read())

# API server params
api_server = env['api_server']
api_version = env['api_version']
api_url = api_server + api_version
auth ='Bearer ' + env['bearer_token']  # Bearer token assigned to this raspberry

# Raspberry params
# Raspberry ID
rasp_id = env['rasp_id']

# Adafruit_DHT.DHT22
sensor = Adafruit_DHT.DHT22

# Raspberry Pi connected to GPIO23.
pin = 23

# varaibles sensor values
humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
# humidity = 66.8
# temperature = 27.5

# print connection messages
print('Connecting to Basic IoT API server')
# Validate API URL different than Null or None
if api_url is not None:
    print(api_url)
else:
    print('Error, it cannot find API URL to connect')
# Validate if Bearer token was loaded
if auth is not None:
    print('Authenticacion values: ok')
else:
    print('Error loading authentication values')

# Connect to basic iot - server
# Endpoint /sensors/:id Method: POST
# Connection to server IP
conn = httplib.HTTPSConnection(api_url)
# Assigne body values
params = urllib.urlencode({
    '@name': 'Raspberry # 1',
    '@values': {
        '@humedad': humidity,
        '@temperatura': temperature
    },
    '@clientId': rasp_id
})
# Declare headers
headers = {
    "Content-type": "application/x-www-form-urlencoded",
    "Authorization": auth
}
# Request
conn.request("POST", "/sensors", params, headers)
# Response details
response = conn.getresponse()
print response.status, response.reason
data = response.read()
print data
conn.close()

# Return values
if humidity is not None and temperature is not None:
    print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
else:
    print('Failed to get reading. Try again!')
