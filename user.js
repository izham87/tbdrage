// ==UserScript==
// @name        TBDmeme
// @namespace   TBDmeme
// @description TBDmeme
// @include     http*://forum.tbd.my*
// @version     1
// @grant       none
// ==/UserScript==

window.addEventListener("load", main, false);

var url = {};

$.getJSON("https://api.github.com/repos/mokhdzanifaeq/tbdrage/contents/meme", function(data) {
  $.each(data, function(key, val) {
    var name = val.name.replace(".png","");
    url[name] = val.download_url;
  });
});

function main() {
  Shoutbox.sockets.sendShout = function(x){
    //console.log( parse(x) );
    socket.emit( "plugins.shoutbox.send", parse(x) );
  }
}

function parse(x) {
  var regex = /^~(.+)$/;
  var matches = x.message.match(regex)
  if (matches) {
    if (url.hasOwnProperty(matches[1])) {
      x.message = "![](" + decodeURIComponent(url[matches[1]]) + ")";
    }
  }
  return x;
}