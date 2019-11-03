let removeButton = document.getElementById('remove-adds');

removeButton.onclick = function(element) {    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{
			  file: 'remove-adds.js'
			}
		); 
    });
  };
  
	
	
	