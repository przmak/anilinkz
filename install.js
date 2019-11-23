'use strict';

function reloadExtension() {
    console.log("Reloading Extension");
    chrome.runtime.reload();
}

function showTime() {
    var date = new Date();
    console.log(date.toString());
    console.log(date.getMilliseconds());
}

chrome.runtime.onInstalled.addListener(function () {
    console.log("##############################################");
    console.log("############## Installation Start ############");
    console.log("##############################################");
    chrome.storage.sync.get('reloadPage', function (obj) {
        if (!obj.hasOwnProperty('reloadPage')) {
            chrome.storage.sync.set({reloadPage: false}, function () {
                console.log("Storage reloadPage set to false");
            });
        }
    });
    chrome.storage.sync.set({
        restartRequired: false,
        host: "aniwatcher.com",
        isDev: false
    }, function () {
        console.log("Storage restartRequired set to false");
        console.log("Storage host set to aniwatcher.com");
        console.log("Storage isDev set to true");
        chrome.storage.onChanged.addListener(function (changes, area) {
            if (changes.hasOwnProperty('restartRequired') && changes.restartRequired.newValue) {
                showTime();
                reloadExtension();
            }
        });
        console.log("##############################################");
        console.log("############## Installation End ##############");
        console.log("##############################################");
    });

});
