
$(document).ready(function() {
	"use strict";

    $(".go-home-btn").click(function(){
        $(".landing-wrapper").addClass('vanish');
        $('body').removeClass('overflow-hidden');
        setTimeout(function(){
            $(".landing-wrapper").hide();
        },700);
    });
});