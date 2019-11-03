"use strict"
var scriptCounter = 0;
var readyStateCheckInterval = setInterval(function() {		
	if (document.readyState === "complete") {			
		scriptCounter += 1;
		if(scriptCounter > 10){
			clearInterval(readyStateCheckInterval);
		}		
		var script = document.getElementsByTagName("script");
		for(var i = 0;i < script.length; i++){
			script[i].remove();	
		}
	}
}, 100);