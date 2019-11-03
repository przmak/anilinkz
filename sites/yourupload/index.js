
var readyStateCheckInterval = setInterval(function() {		
	if (document.readyState === "complete") {			
		clearInterval(readyStateCheckInterval);
		return;
		var source = jQuery(jQuery(".jw-media.jw-reset video")[0]).attr("src");
		var newElement = "<video src='" + source + "'>";
		jQuery(".jw-media.jw-reset").html("");
		jQuery(".jw-media.jw-reset").html(newElement);
		
		jQuery(".jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-icon-playback").on("click", function(){
			this.play();
		})
		
		
	}
}, 100);