{{{
    "title"    : "First Post: Webrtc with me or rtcwith.me",
    "tags"     : [ "nodejs", "webrtc"],
    "category" : "node",
    "date"     : "10-12-2012"
}}}

Using the html5 webrtc api to connect to friends, enemies or strangers. A demostration website I created to show how to build a polyglot nodejs app as well as a platform to innovate with the webrtc api's.

## rtcwith.me ##

WebRTC with me is a quick way of creating disposable chat rooms with
friends, enemies, and strangers. It uses HTML5 WebRTC JavaScript API's
to set up a peer to peer voice and video chat between you and whoever.
No plug-ins are need but you will need a dev-channel release of chrome
to get started. Click the chat button above to be put into your own
personal chat. Then send your chat URL to whoever you want to chat with.
Authentication is handled by Twitter OAuth so you don't have to sign up
for anything new, and don't worry about handing out your chat URL, you
can always regenerate it on your profile page. The site is live
[here](http://rtcwith.me)

## platform ##

rtcwith.me is built using the express framework for nodejs. View
templates are created with Jade, and are both rendered client-side and
server-side. I used mongoose to create Models which are stored in
MongoDB, and used the npm module passport to handle twitter
authentication. I also use Redis to keep track of which chat rooms are
occupied. Clients connect to the server after joining chats using
socket.io. You can find the code [here](https://github.com/bryanpaluch/webrtc-to-me).

I will create a few update posts in the future to go over some key parts
of the code.
