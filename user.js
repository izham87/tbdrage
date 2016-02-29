// ==UserScript==
// @name        tbdrage
// @namespace   http://forum.tbd.my
// @author      mokhdzanifaeq
// @description rage face for shoutbox
// @include     http*://forum.tbd.my*
// @version     3
// @run-at      document-end
// @grant       none
// ==/UserScript==
'use strict';

var url = {};

$(window).on('action:ajaxify.end', function(event, data) {
  if (!data.url) {
    $.getJSON("https://api.github.com/repos/mokhdzanifaeq/tbdrage/contents/meme", function(data) {
      $.each(data, function(key, val) {
        var name = val.name.replace(".png","");
        url[name] = val.download_url;
      });
    });
    app.alertSuccess('tbdrage has been loaded');
    Shoutbox.instances.main.sockets.sendShout = function(t){
      //console.log(t);
      //console.log(parse(t));
      socket.emit( "plugins.shoutbox.send", parse(t) );
    }
  }
});

function parse(x) {
  x.message = x.message.replace(/(~([^\s]+)|;d)/gi, function(match, p1, p2){
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
