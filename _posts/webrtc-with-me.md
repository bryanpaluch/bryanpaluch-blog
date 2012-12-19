{{{
    "title"    : "First Post: rtcwith.me a simple webrtc chatting service",
    "tags"     : [ "nodejs", "webrtc"],
    "category" : "node",
    "date"     : "10-12-2012"
}}}

I've been working a lot with webrtc at work and I wanted to
create a website that demonstrated a service that a third party could
easily make. Rtcwith.me is that example service. 

## service overview ##

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

## how was it build? ##

rtcwith.me is built using the express framework for nodejs. View
templates are created with Jade, and are both rendered client-side and
server-side. I used mongoose to create Models which are stored in
MongoDB, and used the npm module passport to handle twitter
authentication. I also use Redis to keep track of which chat rooms are
occupied. Clients connect to the server after joining chats using
socket.io. You can find the code [here](https://github.com/bryanpaluch/webrtc-to-me).

In the future rtcwith.me users will be able to authenticate with
webrtc/telecom providers to get access to their cellphone/set top box
conferencing services.

I will create a few update posts in the future to go over some key parts
of the code.
