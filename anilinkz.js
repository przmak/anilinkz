'use strict';
function clearElementsByTag(tag) {
    var elements = document.getElementsByTagName(tag);
    var length = elements.length - 1;
    for (var i = length; i >= 0; i--) {
        elements[i].remove();
    }
}

/**########################################################################
 * ########################################################################
 * Clearing iframes from the page
 * ########################################################################
 * ########################################################################*/
var frameClearingTimeout = 2000;
var iframeClearIntervalCounter = 0;

function clearFrames() {
    var frames = document.getElementsByTagName('iframe');
    var length = frames.length - 1;
    for (var i = length; i >= 0; i--) {
        var isProtected = false;
        //var protectedFrames = jQuery('.spart iframe');
        jQuery('.spart iframe').each(function (index) {
            if (frames[i].getAttribute('src') === this.getAttribute('src')) {
                isProtected = true;
            }
        });
        if (!isProtected) {
            frames[i].remove();
        }
    }
    iframeClearIntervalCounter++;
    if (iframeClearIntervalCounter < 30) {
        setTimeout(clearFrames, frameClearingTimeout);
    }
}

/**########################################################################
 * ########################################################################
 * Clearing Javascript from the page
 * ########################################################################
 * ########################################################################*/
var clearingJavascriptTimeout = 500;
var javascriptClearIntervalCounter = 0;

function clearJavascript() {
    clearElementsByTag("script");
    clearElementsByTag("noscript");
    var linkScripts = document.getElementsByTagName("link");
    var length = linkScripts.length - 1;
    for (var i = length; i >= 0; i--) {
        if (linkScripts[i].getAttribute('as') === 'script') {
            linkScripts[i].remove();
        }
    }

    javascriptClearIntervalCounter++;
    if (javascriptClearIntervalCounter < 10) {
        setTimeout(clearJavascript, clearingJavascriptTimeout);
    }
}

/**########################################################################
 * ########################################################################
 * Removes small window that pops up ea time you land on the page
 * ########################################################################
 * ########################################################################*/
function handleAboutBlank() {
    if (!window.parent.location.host || window.parent.location.host === "aniwatcher.com") {
        setTimeout(window.close, 100);
    }
}

/**########################################################################
 * ########################################################################
 * Prevent Redirect on content click, also handles content clicking
 * ########################################################################
 * ########################################################################*/
function handleClick() {
    document.captureEvents(Event.CLICK);
    document.onclick = function (ev, elm) {
        console.log('handle');
        ev.preventDefault();
        ev.stopPropagation();
        var target = jQuery(ev.target);
        handlePlaySpan(target);
        handleLink(target);
    };
}

function handleLink(target) {
    if (jQuery(target).prop('tagName') === "A") {
    	if(jQuery(target).hasClass('_moveLink')){
    		return window.open(jQuery(target).attr('href'));
		}
        window.location.href = jQuery(target).attr('href');
    }
}

function handlePlaySpan(target) {
    if (jQuery(target).hasClass('play')) {
        var link = jQuery(target).parents('a').attr('href');
        window.location.href = link;
    }
}

/**########################################################################
 * ########################################################################
 * Clicking handling ends here
 * ########################################################################
 * ########################################################################*/



/**########################################################################
 * ########################################################################
 * Handle player transformation
 * ########################################################################
 * ########################################################################*/

function createLink(link, label) {
	var linkToCreate = document.createElement("a");
	linkToCreate.setAttribute('href', link);
	linkToCreate.setAttribute('target', '_blank');
	linkToCreate.innerHTML = label;
	linkToCreate.setAttribute('class', '_moveLink');
	return linkToCreate;
}

function transformPlayer() {
    jQuery('.spart,#parts').css('display', 'none');
    var frames = jQuery('.spart iframe');
    var linksToRender = [];
    if (frames.length === 1) {
		linksToRender.push(createLink(frames[0].getAttribute('src'), 'Click Here To Watch'));
    }
	if (frames.length > 1) {
		jQuery('.spart iframe').each(function (index) {
			linksToRender.push(createLink(this.getAttribute('src'), 'Click Here To Watch - Part:' + (index + 1)));
		});
	}
	jQuery("#player,#playinfo,#social").remove();
	jQuery('#Videoads').append(linksToRender);
}
/**########################################################################
 * ########################################################################
 * Player Handling Ends Here
 * ########################################################################
 * ########################################################################*/


function runCode() {
    handleAboutBlank();
    handleClick();
    clearJavascript();
    clearFrames();
    transformPlayer();
}

/**
 *
 * @param array data
 */
function runDevCode(data) {
    if (data.hasOwnProperty('reloadPage') && data.reloadPage) {
        chrome.storage.sync.set({reloadPage: false}, function () {
            chrome.storage.sync.set({restartRequired: true}, function () {
                window.location.reload();
            });
        });
        return;
    }
    chrome.storage.sync.set({reloadPage: true}, function () {
        runCode();
    });
}

jQuery(document).ready(function () {
    if (chrome.storage) {
        chrome.storage.sync.get(['isDev', 'reloadPage'], function (data) {
            if (data.isDev) {
                return runDevCode(data);
            }
            runCode();
        });
    } else {
        runCode();
    }
});

