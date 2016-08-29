$(window).scroll(function(){ 
	if($(this).scrollTop()>0){ 
		$(".link").addClass("link-scroll"); 
	} 
	else{ 
		$(".link").removeClass("link-scroll"); 
	} 
});