/* =============================================================
 * ios-orientation-change-fix.js v1.0.0
 * Fixes zoom on rotation bug in iOS.
 * Script by @scottjehl, rebound by @wilto
 * https://github.com/scottjehl/iOS-Orientationchange-Fix
 * MIT / GPLv2 License
 * ============================================================= */

(function(w){
	
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent;
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}

    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
				
		// If portrait orientation and in one of the danger zones
        if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }
	
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );





/* =============================================================
 * pop.js v1.0
 * Simple jQuery modal dialogue pop-up windows.
 * Script by Chris Ferdinandi - http://gomakethings.com
 * Licensed under WTFPL - http://www.wtfpl.net
 * ============================================================= */

$(function () {
    // Modal toggle button
    $('.modal-toggle').click(function(e) {
        e.preventDefault(); // Prevent default link behavior.
        var modalID = $(this).attr('data-target'); // Get the target modal ID.
        
        $('body').append('<div class="modal-bg"></div>'); // Add modal background.
        $(modalID).addClass('active').css('top', $(window).scrollTop() + 50 + "px"); // Add or remove the .active class from the modal.
    });

    // Modal close button
    $('.modal-close').click(function(e) {
        e.preventDefault(); // Prevent default link behavior.
        $('.modal').removeClass('active'); // Hide modal.
        $('.modal-bg').remove(); // Remove modal background.
    });

    // When click outside of modal
    $('body').on('click','.modal-bg',function() {
        $('.modal').removeClass('active'); // Hide modal.
        $('.modal-bg').remove(); // Remove modal background.
    });

    // When escape key pressed
    $(document).on('keydown',function(e) {
        if ( e.keyCode === 27 ) { // If escape key pressed
            $('.modal').removeClass('active'); // Hide modal.
            $('.modal-bg').remove(); // Remove modal background.
        }
    });
});
