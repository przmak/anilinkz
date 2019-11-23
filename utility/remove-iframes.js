"use strict"
var scriptCounter = 0;
var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		scriptCounter += 1;
		if(scriptCounter > 10){
			clearInterval(readyStateCheckInterval);
		}
		var elements = document.getElementsByTagName('iframe');
		var length = elements.length - 1;
		for (var i = length; i >= 0; i--) {
			elements[i].remove();
		}
	}
}, 2000);