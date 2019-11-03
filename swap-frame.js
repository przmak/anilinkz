var readyStateCheckInterval = setInterval(function() {	
		if (document.readyState === "complete") {		
			var source = jQuery(jQuery("#Videoads iframe")[0]).attr("src");
			if(source){
				clearInterval(readyStateCheckInterval);
				var openMethod = "_blank";
				var frameElement = "<a target='"+ openMethod +"' id='pr-move-link' href='" + source + "'>Ogladaj</a>";				
				jQuery("#Videoads").html(frameElement);	
			}			
		}
}, 100);