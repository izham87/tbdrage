// ==UserScript==
// @name        TBDmeme
// @namespace   TBDmeme
// @description TBDmeme
// @include     http*://forum.tbd.my*
// @version     1
// @grant       none
// ==/UserScript==
'use strict';

window.addEventListener("load", main, false);

var url = {};

$.getJSON("https://api.github.com/repos/mokhdzanifaeq/tbdrage/contents/meme", function(data) {
  $.each(data, function(key, val) {
    var name = val.name.replace(".png","");
    url[name] = val.download_url;
  });
});

function main() {
    app.alertSuccess('TBDMeme has been loaded');
 Shoutbox.instances.main.sockets.sendShout = function(t){
    console.log(t);
    console.log(parse(t));
    socket.emit( "plugins.shoutbox.send", parse(t) );
  }
}

function parse(x) {
  x.message = x.message.replace(/(~(=?\w+)|;d)/gi, function(match, p1, p2){
      //console.log(p1);
    if (p1) {
      var name = p2 ? p2.toLowerCase() : 'troll';
      if (url.hasOwnProperty(name)) {
        match = "![](" + decodeURIComponent(url[name]) + ")";
      }
    }  
    return match;
  });
  return x;
}
