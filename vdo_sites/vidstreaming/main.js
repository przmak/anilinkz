'use strict'
jQuery(document).ready(function () {
    jQuery('.list-server-items li').each(function (index) {
        var link = jQuery(this).attr('data-video');
        if (link && (typeof link === 'string') && link.search('mp4upload') > 0) {
            window.location.href = link;
        }
    })
    jQuery(".jw-display-controls .jw-reset").on("click", function(e){
        e.preventDefault();
        e.stopPropagation();
    });
});
