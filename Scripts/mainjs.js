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
    case 'css/aldinecss.css':
      document.getElementById('currentlocalcss').setAttribute('href', 'css/Css_1500.css');
      break;
    
  }
})


//sidebar
/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "25%px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}







//prende gli articloi da un js senza ricaricare la pagina
		String.prototype.tpl = function(o) { 
			var r = this ; 
			for (var i in o) { 
				r = r.replace(new RegExp("\\$"+i, 'g'),o[i])  
			} 
			return r 
		}
		
		var listItemTpl = `<li><a href='#' onclick='load("$url")'>$label</a></li>`
		
		$(document).ready(main);




		function main() {
			$.ajax({
				method: 'GET',
				url: 'https://imwtproject.github.io/howdowecallitmagazine/frank.json',
				success: function(d) {
					for (var i=0; i<d.length; i++) {
						$('#list').append(listItemTpl.tpl({url:d[i].url, label: d[i].label}))
					}	
				},
				error: function() {
					alert('No document to show')
				}
			});
//robe metadati			
			$('#showperson').click(function() {
				if (this.checked) 
					$('.person').addClass('text-person')
				else
					$('.person').removeClass('text-person')
			})
			
			$('#showcharacter').click(function() {
				if (this.checked) 
					$('.character').addClass('text-character')
				else
					$('.character').removeClass('text-character')
			})
			
			$('#showliteraryWork').click(function() {
				if (this.checked) 
					$('.literaryWork').addClass('text-literaryWork')
				else
					$('.literaryWork').removeClass('text-literaryWork')
			})
			
			$('#showconcept').click(function() {
				if (this.checked) 
					$('.concept').addClass('text-concept')
				else
					$('.concept').removeClass('text-concept')
			})
			
			$('#showrefOther').click(function() {
				if (this.checked) 
					$('q.refOther').addClass('text-refOther')
				else
					$('q.refOther').removeClass('text-refOther')
			})
			
			
			$('#showrefFrankenstein').click(function() {
				if (this.checked) 
					$('q.refFrankenstein').addClass('text-refFrankenstein')
				else
					$('q.refFrankenstein').removeClass('text-refFrankenstein')
			})
		}
		
		function load(file) {
			$.ajax({
				method: 'GET',
				url: file,
				success: function(d) {
					$('#file').html(d)
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
				<p class="list author"><b>Headings: </b><ul>$headings</ul></p>
				
				` ;
			$(where).empty(); 

			var title = $(from + ' h1')[0].innerText
			var author = $(from + ' .byline')[0].innerText
		    var date = $(from + ' .dateline')[0].innerText
			var issue = $(from + ' .issued')[0].innerText
			var headingList = $(from + ' h2')
			var headings = ""
			for (var i=0; i<headingList.length; i++) {
				headings += "<li class='small'>"+headingList[i].innerHTML+"</li>"
			}
			$(where).append(item.tpl( {
				author: author,
				title: title,
				date: date,
				issue: issue,
				headings: headings
			}))
		}
		
		function filltab(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto('$place')">$content</a></li>`
			var elements = $(what); 
			$(where+' ul').empty(); 
			for (var i=0; i<elements.length; i++) {
				$(where+' ul').append(list.tpl({
					style:style, 
					place: '#'+elements[i].id,
					content: elements[i].innerHTML
				}) )
			}
		}

		function goto(id) {
			var t = $(id)[0].offsetTop;
			$('body').animate({ scrollTop: t }, 200);
			$(id).addClass('animate');
			setTimeout(function(){
				$(id).removeClass('animate');
			},5000);
		}
		
		
		
