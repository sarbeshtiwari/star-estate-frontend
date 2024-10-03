
$(document).ready(function() {
	"use strict";

	$('[data-toggle="tooltip"]').tooltip();

	/*****go to specific div******/
	/*$(function(){
		// catch all clicks on a tags
		$('a').click(function() {
			// check if has hash
				console.log(this.hash);
			if(this.hash){
				// get rid of the # sign
				var hash = this.hash.substr(1);
												
				// get the position of  the <a name>
				var $toElement = $('a[name="'+hash+'"]');
				var $toPosition = $toElement.position().top / 1.0;
				
				// scroll/animate to that element
				$("body,html").animate({
					scrollTop : $toPosition
				}, 1000);
				
				// don't do the jump
				
				return false;
			}
        });
			
		if(location.hash){
			var hash = location.hash;
			window.scroll(0,0);
			$("a[href="+hash+"]").click();
		}
	});*/
	/*****go to specific div******/
	
	$(".menuBtn").click(function() {
		$(this).toggleClass('closeMenuBtn');
        $('.menuContainer').stop().fadeToggle();
        $('.header').toggleClass('notfixed');
        // $('body').toggleClass('overflow-hidden');
    });
	
	$(".hasDropChild").click(function() {
		$(".hasDropChild .dropdown").slideUp(500);
		if($(this).find(".dropdown").is(':hidden') === true) {
			$(this).find(".dropdown").slideDown('normal');
		 }
	});

	$(".plansBtn").click(function(){
		$(".plansBtn.active").removeClass('active');
		$(this).addClass('active');
		$(".plansContainer").hide();
		$("#plansContainer"+$(this).data('target')).fadeIn(300);
	});

	// setTimeout(function(){
	// 	$('#formModal').modal('show');
	// },1000*20);
	
	$(window).bind('scroll', function () {
		if ($(window).scrollTop() > 100) {
			$('.button-top').animate({
				opacity:1
			},0);
		}
		else {
			$('.button-top').animate({
				opacity:0
			},0);
		}
	});
	$(".button-top").click(function(){
	   $("html,body").animate({scrollTop:'0px'},500);
	});

	$(".moreBtn").click(function () {
		if ($(this).html() === "Read More") {
		  	$(this).html() === "Read Less";
		} else {
			$(this).html() === "Read More";
		}
		$(".moreText[data-hit=more-" + $(this).data("target") + "]").slideToggle(500);
	});
	
	$('[data-magnify]').magnify({
		//movable: false,
		//resizable: false,
		headToolbar: [
			'close'
		],
		initMaximized: true
	});
});
		
$(window).scroll(function(){
	"use strict";
	
	var wScroll = $(this).scrollTop();
	//var $ht = $(".banner").innerHeight() / 2;
	
	if (wScroll >= 50) {
		$("header, .fixed-form").addClass("fixed");
	} else {
		$("header, .fixed-form").removeClass("fixed");
	}
});