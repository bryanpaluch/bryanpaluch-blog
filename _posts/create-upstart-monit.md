{{{
    "title"    : "Using Upstart and Monit to run nodejs",
    "tags"     : [ "nodejs", "monit", "upstart", "deployment", "devops"],
    "category" : "node",
    "date"     : "12-18-2012"
}}}

I know there are a lot of really great Platform as a service offerings
out there but for some just running a bunch of random small services on
an ec2 instance is easier. Up until a few days ago I've been using
forever to keep my processes running and just hoping my server doesn't
restart. It's worked although kind of manually. I've started using
upstart and monit because of the added control and security they add to
my system. After reading
[this](http://howtonode.org/deploying-node-upstart-monit) I got started
converting my services. I felt the most annoying part of all of it was
creating the configuration files for both upstart and monit. I've got
about 7 nodejs services running on my machine and all of the files ended
up being very similar. I fat fingered one of the configuration files
during the tutorial and it resulted in an hour of debugging. I decided that
automating the creation of these files based off of the application's
package.json and it's port, would be the best way of
avoiding future debug sessions. I've published my tool to npm it's
called create-upstart-monit.

## using create-upstart-monit ##

First thing you will want to do is set up your system to use upstart and
monit. Instructions for that can be found [here](http://howtonode.org/deploying-node-upstart-monit). Once you
have monit installed, you can use my tool
to generate the upstart and monit configuration files.
Here are the instructions to do that:

install globally using you may need sudo

```javascript

npm install create-upstart-monit -g

```

Then go to the application you want to generate upstart and monit files

```javascript
ubuntu@hostname:/opt$ cd home-monitor/cloud-cordinator/
ubuntu@hostname:/opt/home-monitor/cloud-cordinator$ create-upstart-monit -p 3003
upstart file written to
/opt/home-monitor/cloud-cordinator/.deployscripts/xbeecloudcordinator.conf 
monit file written to
/opt/home-monitor/cloud-cordinator/.deployscripts/xbeecloudcordinator.monit.conf
Upstart and Monit file generator for nodejs
```

You can then move them over to /etc/init/ and /etc/monit/conf.d/
yourself.

```javascript
ubuntu@hostname:/opt/home-monitor/cloud-cordinator$ sudo cp
.deployscripts/xbeecloudcordinator.conf /etc/init/
ubuntu@hostname:/opt/home-monitor/cloud-cordinator$ sudo cp
.deployscripts/xbeecloudcordinator.monit.conf /etc/monit/conf.d/
```

Then you start your service with something like

```javascript
ubuntu@hostname:/opt/$sudo start xbeecloudcordinator

```

Or you can do it through monit.

I will be updating this tool as I fine tune my monit and upstart
configurations.

