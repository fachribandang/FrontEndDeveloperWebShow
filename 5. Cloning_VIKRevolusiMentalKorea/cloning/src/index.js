$( document ).ready(function() {
	// video 
	$(function() {
		$("body img").lazyload({placeholder:"images/loading.png", effect:("fadeIn"), threshold : 150});
	});
	var callbacks = {
    '0': function(){ 
       //$('#bgvid').get(0).pause();
	   //$('#bgvid2').get(0).pause(); 
    },
    '500': function(){
		callPlayer("vid1","playVideo");
        //$('#bgvid').get(0).play();// Handle action for between 0 - 479
    },
    '2500': function(){
		callPlayer("vid1","pauseVideo");
       //$('#bgvid').get(0).pause(); // Handle action for between 480 on
    },
//	'28500': function(){
//       $('#audio').trigger("pause").prop("currentTime",0); // Handle action for between 480 on
//    },
//	'28750': function(){
//       $('#audio').trigger("play");  // Handle action for between 480 on
//    },
//	'38750': function(){
//       $('#audio').trigger("play"); // Handle action for between 480 on
//    },
//	'39500': function(){
//       $('#audio').trigger("pause").prop("currentTime",0); // Handle action for between 480 on
//    },
	'40750': function(){
		callPlayer("vid2","pauseVideo");
		//$('#bgvid2').get(0).pause(); // Handle action for between 480 on
    },
	'41000': function(){
		callPlayer("vid2","playVideo");
       //$('#bgvid2').get(0).play(); // Handle action for between 480 on
    },
	'41750': function(){
		callPlayer("vid2","pauseVideo");
       //$('#bgvid2').get(0).pause(); // Handle action for between 480 on
    },
	
};
function callPlayer(frame_id, func, args) {
    if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
    var iframe = document.getElementById(frame_id);
    if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
        iframe = iframe.getElementsByTagName('iframe')[0];
    }
    if (iframe) {
        // Frame exists, 
        iframe.contentWindow.postMessage(JSON.stringify({
            "event": "command",
            "func": func,
            "args": args || [],
            "id": frame_id
        }), "*");
    }
}
// Handles scroll event function calls
var renderHandler = function( data ) {
    if (data.curTop === data.lastTop) {
        return;
    }

    var from = data.lastTop;
    var to = data.curTop;
    var toCall = [];

    if (data.curTop < data.lastTop) {
        from = data.curTop;
        to = data.lastTop;
    }

    for ( var hollaback in callbacks ) {
        if( !callbacks.hasOwnProperty(hollaback) ) {
            continue;
        }

        if (hollaback >= from && hollaback <= to) {
            var fn = callbacks[hollaback];
            if (data.direction === 'up') {
                toCall.push(fn);
            } else {
                fn();
            }
        }
    }

    if (data.direction === 'up') {
        toCall.reverse();
        var i = 0;
        var l = toCall.length;
        for (; i < l; i++) {
            toCall[i]();
        }
    }
};

setTimeout(function() {
		var s = skrollr.init({
			forceHeight: true,
			render: renderHandler
		});

		skrollr.menu.init(s, {
			change: function(hash, top) {
				console.log(hash, top);
			}
		});
	}, 1000);	
});	