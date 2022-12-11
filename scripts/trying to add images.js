document.addEventListener('DOMContentLoaded', function() {
	var styletag = document.getElementById('currentlocalcss')
	var style = styletag.getAttribute('href')
	var coverleft = document.getElementById('cover-left')
	var coverright = document.getElementById('cover-right')
	if( style === './css/css_y2k.css' ) {
		img = document.createElement("img")
		coverleft.appendChild("img") ;
		img.setAttribute("src", "./assets/img/y2k/holographicstargreen.png") ;
		img.setAttribute("id", "star1");
		coverright.appendChild("img") ;
		img.setAttribute("src", "./assets/img/y2k/holographicstar.png") ;
		img.setAttribute("id", "star1");
	}
})



/*side by side text*/

// Ovid

function compareArticle() {
	var x = document.getElementById("OVoriginalText");
	var y = document.getElementById("OVtextEn");
	x.style.display = "block";
	y.classList.add("col-sm-6", "col-md-5", "col-lg-6");
	$('.ovid').css('display', 'block');
	$('.indexcompare').css('display', 'none');
  }
  
  function hideOriginalOvid() {
	var x = document.getElementById("OVoriginalText");
	var y = document.getElementById("OVtextEn");
	$('.ovid').css('display', 'block');
	$('.indexcompare').css('display', 'none');
	x.style.display = "none";
	y.removeAttribute("class");
	$('.indexcompare').css('display', 'none');
  }


  /* responsive fab */

$(document).ready(function () {
	var styletag = document.getElementById('currentlocalcss')
	var style = styletag.getAttribute('href')
	var coverleft = document.getElementById('cover-left')
	var coverright = document.getElementById('cover-right')
	if( style === './css/css_y2k.css' ) {
		coverleft.innerHTML= "<img src='./assets/img/y2k/holographicstargreen.png' width='30' height='30'></img>"
		coverright.innerHTML="<img src='./assets/img/y2k/holographicstargreen.png' width='30' height='30'></img>"
	}})	
