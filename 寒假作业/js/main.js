$(function()
{
	$("#cure").hover(function() {
		$(".cure").show("fast");
	}, function() {
		$(".cure").hide("fast");
		/* Stuff to do when the mouse leaves the element */
	});
	$("#after").hover(function() {
		$(".after").show("fast");
	}, function() {
		$(".after").hide("fast");
		/* Stuff to do when the mouse leaves the element */
	});
	$("#idol").hover(function() {
		$(".idol").show("fast");
	}, function() {
		$(".idol").hide("fast");
		/* Stuff to do when the mouse leaves the element */
	});
	$("#sorrow").hover(function() {
		$(".sorrow").show("fast");
	}, function() {
		$(".sorrow").hide("fast");
		/* Stuff to do when the mouse leaves the element */
	});
	$("#god").hover(function() {
		$(".god").show("fast");
	}, function() {
		$(".god").hide("fast");
		/* Stuff to do when the mouse leaves the element */
	});
	$("#exciting").hover(function() {
		$(".exciting").show("fast");
	}, function() {
		$(".exciting").hide("fast");
		/* Stuff to do when the mouse leaves the element */
	});
	$("#wisdom").hover(function() {
		$(".wisdom").show("fast");
	}, function() {
		$(".wisdom").hide("fast");
		/* Stuff to do when the mouse leaves the element */
	});
	$("#love").hover(function() {
		$(".love").show("fast");
	}, function() {
		$(".love").hide("fast");
		/* Stuff to do when the mouse leaves the element */
	});
	$("#girl").hover(function() {
		$(".girl").show("fast");
	}, function() {
		$(".girl").hide("fast");
		/* Stuff to do when the mouse leaves the element */
	});
	$("#advan").hover(function() {
		$(".advan").show("fast");
	}, function() {
		$(".advan").hide("fast");
		/* Stuff to do when the mouse leaves the element */
	});
	$("#day").hover(function() {
		$(".day").show("fast");
	}, function() {
		$(".day").hide("fast");
		/* Stuff to do when the mouse leaves the element */
	});
})	








	var t; 
var speed = 20;
var nowlan=0; 
function changepic() { 
var imglen = $("div[name='pic']").find("div").length; 
$("div[name='pic']").find("div").hide(); 
$("div[name='pic']").find("div").eq(nowlan).show(); 
nowlan = nowlan+1 ==imglen ?0:nowlan + 1; 
t = setTimeout("changepic()", speed * 1000); 
} 
var t2; 
var speed2 = 20; 
var nowlan2=0;
function changepic2() { 
var imglen2 = $("div[name='pic2']").find("div").length; 
$("div[name='pic2']").find("div").hide(); 
$("div[name='pic2']").find("div").eq(nowlan2).show(); 
nowlan2 = nowlan2+1 ==imglen2 ?0:nowlan2 + 1; 
t2 = setTimeout("changepic2()", speed2 * 1000); 
} 
onload = function () { changepic(); }
onload = function () { changepic2(); } 
$(document).ready(function () { 
//鼠标在图片上悬停让切换暂停 
$("div[name='pic']").hover(function () { clearInterval(t); }); 
//鼠标离开图片切换继续 
$("div[name='pic']").mouseleave(function () { changepic(); }); 
$("div[name='pic2']").hover(function () { clearInterval(t2); }); 
//鼠标离开图片切换继续 
$("div[name='pic2']").mouseleave(function () { changepic2(); }); 
}); 


 

