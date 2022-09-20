// To change historical theme 
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
    case 'css/Css_1500.css':
      document.getElementById('currentlocalcss').setAttribute('href', 'css/Css_1500.css');
      break;
    
  }
})










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
				//prova
				closeOccurrences();
                if ($(window).width() < 768) {
                 closeNav()
                 }
				 //fine prova
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
		


//prova tendina metadati

function openNav() { //Elisa
    closeOccurrences();
    $('.offcanvas').css('transform', 'translateX( 0 )');
    }

function closeNav() {
    $('.offcanvas').css('transform', 'translateX( -320px )');

}


$(document).ready(expandCollapse); //Cristian
$(document).ready(main);
$(window).resize(expandCollapse);

function closeOccurrences() { // Marco
    document.getElementById('occurrences').style.display = 'none';
}

function fillIndex(input_obj, where) {
    var listItem = `<li class="list $style"><a href="javascript:void(0)" onclick="fillOccurrenceTab('$what', 'occurrence', '#occurrences')">$content</a> ($num)</li>`;
    var k = 0;
    $(where).empty();
    for (key in input_obj) {
        if (input_obj.hasOwnProperty(key)) {
            var elements = $(key);
            var style = input_obj[key];
            if ($(key).length) {
                k++;
                $(where).append('<h5>' + style[0].toUpperCase() + style.slice(1) + 's</h5><ul></ul>');
                var namedict = {};
                for (var i = 0; i < elements.length; i++) {
                    var currName = elements[i].innerText;
                    var className = currName.split(' ').join('-').replace(/[\.\'\"\!\?\*\d]/g, '');
                    elements[i].classList.add(className);
                    if (!(currName in namedict)) {
                        namedict[currName] = 0;
                    }

                    namedict[currName]++;
                }
                var arrOfArrays = Object.entries(namedict).sort((a, b) => parseInt(b[1]) - parseInt(a[1]));
                for (const [key, value] of arrOfArrays) {
                    var className = key.split(' ').join('-').replace(/[\.\'\"\!\?\*\d]/g, '');
                    $(where + " ul").last().append(listItem.tpl({
                        content: String(key),
                        num: String(value),
                        what: '#file .' + className,
                        style: style,
                    }));
                }
            }
        }
    }
    if (k == 0) {
        $(where + '-tab').remove();
        $(where).remove();
    }
}



function fillOccurrenceTab(what, style, where) {
    var list = `<li class="list $style"><a href="#" onclick="goto('$place')">$content</a></li>`;
    $(where + ' h5').empty();
    $(where + ' ul').empty();
    var elements = $(what);
    $(where + ' h5').append(elements[0].innerText);
    for (var i = 0; i < elements.length; i++) {
        $(where + ' ul').append(list.tpl({
            style: style,
            place: '#' + elements[i].id,
            content: elements[i].innerText
        }));
    }
    $('#wikiLink').empty();
    var wikiName = elements[0].innerText.split(' ').join('_').replace(/[\.\'\"\!\?\*\,\\\/]/g, '');
    $('#wikiLink').attr('href', 'https://en.wikipedia.org/wiki/' + wikiName);
    $('#wikiLink').html('Search ' + elements[0].innerText + ' on Wikipedia');
    if ( $(window).width() < 768 ) {
        closeNav()
    }
    $(where).fadeIn(200);

}
