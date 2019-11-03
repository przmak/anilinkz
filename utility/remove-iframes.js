var scriptCounter = 0;
var readyStateCheckInterval = setInterval(function() {		
	if (document.readyState === "complete") {			
		scriptCounter += 1;
		if(scriptCounter > 10){
			clearInterval(readyStateCheckInterval);
		}		
		var frames = document.getElementsByTagName("iframe");
		for(var i = 0;i < frames.length; i++){
			frames[i].remove();	
		}
	}
}, 100);