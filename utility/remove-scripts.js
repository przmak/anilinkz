"use strict"
var scriptCounter = 0;
var readyStateCheckInterval = setInterval(function () {
	if (document.readyState === "complete") {
		scriptCounter += 1;
		if (scriptCounter > 10) {
			clearInterval(readyStateCheckInterval);
		}
		var script = document.getElementsByTagName("script");
		var length = script.length - 1;
		for (var i = length; i > 0; i--) {
			script[i].remove();
		}
	}
}, 1000);