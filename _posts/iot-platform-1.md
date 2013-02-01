{{{
    "title"    : "Building Internet Enabled Things with Arduino XBee and Nodejs",
    "tags"     : [ "nodejs", "Interenet of Things", "IoT", "raspberrypi", "Oauth"],
    "category" : "hardware",
    "date"     : "1-30-2013"
}}}

I've been building my own internet enabled thermostat
to control the heating and cooling systems of my house. This was
originally sparked by the Nest thermostat, but I quickly
lost interest after discovering the cost. Part of the problem is that I
have a split system. My furnace controls are on the first floor and my
cooling controls are on the third. At 250 dollars a pop, getting two to cover my whole house seemed a little cost prohibitive. 
My house is also 3 stories, and
most of the time I only care about the temperature of a certain floor.
After trying to find something cheaper, I chose to build something on my own using arduino with xbee radios and a
raspberrypi. I split up the architecture into sensors  and a gateway so I could get
the benefits of a zigbee mesh network, and  still have the computing
power of a linux system on the gateway.

For the time being I'm calling it my home monitoring platform. It's a
bad name, but I'm not in marketing.
Its built using nodejs, mongodb, and arduino. In the future I'll use
redis for scaling out the socket.io connections, and for processing
events. You can follow the development here:
[https://github.com/bryanpaluch/home-monitor](https://github.com/bryanpaluch/home-monitor)

Home-monitor is a 3 layered project, each layer communicates with the
layer above it, and below it.

The first and bottom layer is the
sensing layer, this is where sensors live. Sensors emit packets
of defined framing and formats for announcing their status. They can also receive packets to do actions. I've only created the thermostat sensor so far.
Here is the thermostat:
![Arduino Xbee Thermostat](http://i.imgur.com/sFW1XAD.jpg?1)
It's made of an arduino uno, a 2 relay xbee sheild, an xbee, a
temperature/humidity sensor, and a few leds. The arduino sketch and the
xbee sensor set up are on the repo.

The second layer or application is the sensor-communicator which runs on a
raspberrypi with an xbee explorer dongle. I chose the raspberrypi with
and xbee explorer because the software runs fine on my laptop too. The
sensor-communicator has a few jobs. 

---------------------------------------------------------------------
1. Discovers sensor nodes.
2. Receives and converts sensor readings to JSON.
3. Performs the OAuth handshake with the cloud-coordinator.
4. Gets a encrypted key from the cloud-coordinator, using the OAuth
   protected JSON API.
5. Connects with socket.io and sends the encrypted key over the
   connection.
6. Reports sensor readings to the cloud, when they differ from the
     last reading.
7. Receives actions over the socket.io connection and turns the JSON
     formatted action to a binary buffer and sends it to the correct
     sensor.
----------------------------------------------------------------------

The sensor-communicator essentially acts as a communication trunk for
sensors to the internet. Here is my raspberrypi with the xbee explorer:
![Raspberrypi + Xbee](http://i.imgur.com/ZFWdgRI.jpg)

The final layer is the cloud-coordinator. The sensor-communicators
connect to this, and report what sensors they are in charge of, and also
authenticate against this. It has a bunch of responsibilities as well:

--------------------------------------------------------------------
1. Act as a OAuth gateway to allow access for sensor-communicators.
2. Sign up and Log in users.
3. Serve Web and Mobile UI.
4. Allow viewing of sensor readings and interaction with sensors.
5. Expose a JSON api for other services that want to interact with
     sensors (Protected by OAuth)
6. Sends actions down to sensor-communicators over socket.io
     connection
---------------------------------------------------------------------

I started making the project to deal with my internet thermostat use case
and quickly realized that I could extend it to support any type of
sensor I could think up. To do that I wanted to create an easy to use
JSON format to represent sensors. Here is an example of my thermostat:

```javascript
  1 : {
    sensorType: 'thermostat',
    reading:{
            type : 'uint8',
            currentTemp : 'float32',
            setTemp: 'float32',
            setting : 'uint8',
            relay1 : 'uint8'
    },
    display:[
      {name: 'Current Temp', key: 'currentTemp', type:'degree'}
    , {name: 'Set Temperature', key: 'setTemp', type: 'degree'}
    , {name: 'Setting', key : 'setting', type: 'enum',  keys: [0,1,2], values:['auto', 'off', 'on']}
    , {name: 'Relay Power', key : 'relay1', type: 'enum',  keys: [0,1], values:['off', 'on']}
    ],
    actions:[
      {  name: 'set',
        type: 0,
        keys:[
          {name: 'state', formtype: 'dropdown', valuetype: 'uint8', settings:['auto', 'off', 'on'], values:[0, 1, 2]},
          {name: 'setTemp', formtype: 'slider', valuetype:'float32', min:50, max:80, value:60 }
        ],
        order: ['state', 'setTemp']
      }
    ]
  }
```
the 1 denotes the first byte of a sensor reading, this allows me to
look up the rest of the format in my sensorData.js file. (There is only
one type right now) The reading object is used to decode the rest of the
fields in the packet. I'm using
[https://github.com/vjeux/jParser](https://github.com/vjeux/jParser) to
parse the binary packet to a nice JSON payload. The sensor communicator
will then take this JSON payload and PUT it on the sensor-coordinator.
The display field is used to display sensor readings. Then a jade template convert fields to html. Eventually I
hope to cover a whole bunch of types of fields. After the latest sensor
reading has been formated it will append a button for the actions
in the action array. I've created a similar jade template for
creating forms based off the JSON in action. The action field is also
used on the sensor-communicator to translate a JSON payload
back to a binary packet that gets sent to the sensor. I hope that when I
want to add another sensor the json format will help me quickly add one.

Here's a video of all of that working:

<iframe width="560" height="315"
src="http://www.youtube.com/embed/tqz4VJnQyGA" frameborder="0"
allowfullscreen></iframe>

I'm still working on the web and mobile UI's. I've recently started
using Backbone.js at work and I plan on using it to make a more polished and
scalable UI. I'm also working on a few different types of sensors, my
next one will be a Text LCD screen that will report button presses, and
display text. Additionally I want to make a rules engines that runs
on both the sensor-communicator and cloud-coordinator, This would give me flexibility so I could do rules like:
```javascript
if(livingroom.temp < 65)
  downstairs.relay.on();
```

I haven't decided where to put the
rules engine, but I think most home automation systems out there live on
a split brain type of system.


Leave a comment if you
have any suggestions or questions.


