// To change historical theme (click on the buttons of the second navbar -> change css)
function swapTheme(csspath) {
  document.getElementById('currentlocalcss').setAttribute('href', csspath);
  // When changing the css (= the historical theme) I also set a key-value in sessionStorage
  sessionStorage.setItem('href', csspath);
}

// To save historical theme while browsing on the website
// 1. When I change the html (e.g. <a class="..." href="medea.html)></a>") I need to see what is the css I am starting from and KEEP IT
$(document).ready(function () {
  // 2. I save this starting css in a variable
  var start_style = sessionStorage.getItem('href');
  // I check if the start_style has a certain value and I change the href accordingly 
  switch (start_style) {

	case './css/css_1500-1800.css':
		document.getElementById('currentlocalcss').setAttribute('href', './css/css_1500-1800.css');
		break; 

	case './css/css_y2k.css':
		document.getElementById('currentlocalcss').setAttribute('href', './css/css_y2k.css');
		break;

	case './css/css_1930.css':
		document.getElementById('currentlocalcss').setAttribute('href', './css/css_1930.css');
		break;

	case './css/css_1980.css':
		document.getElementById('currentlocalcss').setAttribute('href', './css/css_1980.css');
		break;

	case './css/css_1800.css':
		document.getElementById('currentlocalcss').setAttribute('href', './css/css_1800.css');
		break;

		case './css/css_2030.css':
		document.getElementById('currentlocalcss').setAttribute('href', './css/css_2030.css');
		break;
  }
})


// scrolltop

/*function goTop() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera  
  }*/


//prende gli articoli da un js senza ricaricare la pagina

/* this = String {`<li><a href='#' onclick='load("$url")'>$label</a></li>`} made into a string*/
			/* o ={url: 'articles/FemaleGothic.html', label: 'Female Gothic'}  fore every article in the json AND both for main art and second art*/
			 /* prima iterazione in cui i= url : 1) $url > g  2) g > 'articles/FemaleGothic.html' */
			 /* seconda iter i=lable : 1) $lable > g 2) g > 'Female Gothic' */
			 /* r once replaced = <li><a href='#' onclick='load("articles/FemaleGothic.html")'>Female Gothic</a></li>*/
		String.prototype.tpl = function(o) { 
			
			var r = this ; 			
			for (var i in o) { 										
				r = r.replace(new RegExp("\\$"+i, 'g'),o[i])  															
			} 
			return r 
		}
		
		var listItemTpl = `<li><a href='#' onclick='load("$url")'>$label</a></li>`
		//var textComparison = `<div class="radio"><label><input type="radio" onclick='compare("$url")'>$label</label></div>`
        //$("input[name='radio']:checked").val()
		
		//mia prov 
		//		$("input[type='radio'][name=compare]").prop('checked', false).val();
		//var textComparison = `<div class="radio"><label><input type="radio" name"compare" onclick='compare("$url")'>$label</label></div>`

		
		var textComparison = `<div class="radio"><label><input type="radio" name="comp" onclick='compare("$url")'>$label</label></div>`
		
		$("input[type=radio][name=comp]").prop('checked', false).val();
		
		$(document).ready(main);

//function for dynamic load of documents list

		function main() {
			$.ajax({
				method: 'GET',
				url: 'https://imwtproject.github.io/WomenOfHorror/frank.json',
				success: function(d) {
					for (var i=0; i<d.length; i++) {
						$('#list').append(listItemTpl.tpl({url:d[i].url, label: d[i].label}))
						$('#compare').append(textComparison.tpl({url:d[i].url, label: d[i].label}))
					}	
				},
				error: function() {
					alert('No document to show')
				}
			});
			
//highlights in the text		
			$('#showperson').click(function() {
				if (this.checked) 
					$('#file .person').addClass('text-person')
				else
					$('#file .person').removeClass('text-person')
			})
			
			$('#showcharacter').click(function() {
				if (this.checked) 
					$('#file .character').addClass('text-character')
				else
					$('#file .character').removeClass('text-character')
			})
			
			$('#showliteraryWork').click(function() {
				if (this.checked) 
					$('#file .literaryWork').addClass('text-literaryWork')
				else
					$('#file .literaryWork').removeClass('text-literaryWork')
			})
			
			$('#showconcept').click(function() {
				if (this.checked) 
					$('#file .concept').addClass('text-concept')
				else
					$('#file .concept').removeClass('text-concept')
			})
			
			$('#showrefOther').click(function() {
				if (this.checked) 
					$('#file q.refOther').addClass('text-refOther')
				else
					$('#file q.refOther').removeClass('text-refOther')
			})
			
			
			$('#showrefFrankenstein').click(function() {
				if (this.checked) 
					$('#file q.refFrankenstein').addClass('text-refFrankenstein')
				else
					$('#file q.refFrankenstein').removeClass('text-refFrankenstein')
			})
		


//metadati2

	$('#showperson1').click(function() {
		if (this.checked) 
			$('#second-text .person').addClass('text-person') //text-person is in css
		else
			$('#second-text .person').removeClass('text-person')
	})
		
	$('#showcharacter1').click(function() {
		if (this.checked) 
			$('#second-text .character').addClass('text-character')
		else
			$('#second-text .character').removeClass('text-character')
	})
	
	$('#showliteraryWork1').click(function() {
		if (this.checked) 
			$('#second-text .literaryWork').addClass('text-literaryWork')
		else
			$('#second-text .literaryWork').removeClass('text-literaryWork')
	})
	
	$('#showconcept1').click(function() {
		if (this.checked) 
			$('#second-text .concept').addClass('text-concept')
		else
			$('#second-text .concept').removeClass('text-concept')
	})
	
	$('#showrefOther1').click(function() {
		if (this.checked) 
			$('#second-text q.refOther').addClass('text-refOther')
		else
			$('#file q.refOther').removeClass('text-refOther')
	})
	
	
	$('#showrefFrankenstein1').click(function() {
		if (this.checked) 
			$('#second-text q.refFrankenstein').addClass('text-refFrankenstein')
		else
			$('#second-text q.refFrankenstein').removeClass('text-refFrankenstein')
	})

}


		
		function load(file) {
			$.ajax({
				method: 'GET',
				url: file,
				success: function(d) {
					$('#file').html(d)
					console.log(d)
					$('.show').prop("checked", false)
					addIds()
					filltabs()
					$('#title').html($('#file h1'))
				},
				error: function() {
					alert('Could not load file '+file)
				}
			});
		}

		/* SIDE BY SIDE TEXT COMPARISON */
		function compare(file) {
			var compArt = document.getElementById("main-article");
			var compDisplay = document.getElementById("compare-article");
			compDisplay.style.display = "block";
			compArt.classList.remove("col-md-12");
			compArt.classList.add("col-md-6");

			$.ajax({
				method: 'GET',
				url: file,
				success: function(d){
				$('#second-text').html(d)
				$('.show').prop("checked", false)
				addIds()
				fillsecondtabs()
				$('#title1').html($('#second-text h1'))				
					},
				error: function(){
					alert('could not load file' + file)
				}
			});
		} 

			/*function for second text*/

		function fillsecondtabs() {
			fillInfo("#second-text", "#secondinfo")
			filltab("#second-text .person","list-person","#secondperson")
			filltab("#second-text .character","list-character","#secondcharacter")
			filltab("#second-text .literaryWork","list-literaryWork","#secondliteraryWork")
		}

		
		function addIds() {
			addId('.person','person')
			addId('.character', 'character')
			addId('.literaryWork', 'literaryWork')
		}
		
		function addId(what, prefix) {
			var id = '0'
			var elements = $(what); 
			for (var i=0; i<elements.length; i++) {
				elements[i].id = prefix + "-" + id++
			}
		}

		function filltabs(){
			fillInfo("#file", "#info")
			filltab("#file .person","list-person","#person")
			filltab("#file .character","list-character","#character")
			filltab("#file .literaryWork","list-literaryWork","#literaryWork")
		}
		
		function fillInfo(from, where) {
			var item = `
				<p class="list title"><b>Title: </b> $title</p>
				<p class="list author"><b>Author: </b> $author</p>
				<p class="list author"><b>Publishing date: </b> $date</p>
				<p class="list author"><b>Issue: </b> $issue</p>
							
				` ;
			$(where).empty(); 

			var title = $(from + ' h1')[0].innerText
			var author = $(from + ' .byline')[0].innerText
		    var date = $(from + ' .dateline')[0].innerText
			var issue = $(from + ' .issued')[0].innerText
			
			$(where).append(item.tpl( {
				author: author,
				title: title,
				date: date,
				issue: issue,
			}))
		}
		
		function filltab(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto1()">$content</a></li>`
			var elements = $(what); 
			$(where +' ul').empty(); 
			for (var i=0; i < elements.length; i++) {
				$(where+' ul').append(list.tpl({
					style: style, 
					place: '#'+ elements[i].id, //created in addIds
					content: elements[i].innerHTML //il nome che appende alla lista
				}) )
			}
		}


		function goto1(){
			var dest = $(place);
			dest.scrollIntoView();
			$(id).addClass('animate');
		}

		
		function goto(id) { 		
			var t = $(id)[0].offsetTop;/* DOM element, read only property*/
			console.log($(id)[0].offsetTop)
			$('#main-article, #compare-article' ).animate({
				scrollTop: $(id).offset().top - 130}, 200);
			$(id).addClass('animate');

			/* this removes the class animate after 5 seconds */
			setTimeout(function(){
				$(id).removeClass('animate');
			},5000);
			}

/* fab styles */ 
function fabopener()	{
	var fab = document.getElementsByClassName('fab-opener');
	var fabWrapper = document.getElementsByClassName('fab-styles');

	fabWrapper[0].classList.toggle('open');
}








/*  accordion */

$('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
  });

  $('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
  });



  /*  change navbar color */
  
  $(function () {
	$(document).scroll(function () {
		var $nav = $("#firstNav");
		$nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
	  });
  });
   
