// check
function loadData() {

  var $body = $('#body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");

  // load streetview

  // YOUR CODE GOES HERE!

  var streetstr = $('#street').val();
  var citystr = $('#city').val();
  var address = streetstr + ' , ' + citystr;

  $greeting.text('So, you want to live at ' + address + '?');

  var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address+'';

  $body.append('<img class="bgimg" src="'+ streetviewUrl +'">');

  var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ citystr +'&sort=newest&api-key=57b75569fdb747498c8d3e6c9efd1e75';


  $.getJSON(URL,function(data){
    $nytHeaderElem.text('New York Times Articles About '+ citystr);

    articles = data.response.docs;
    for(var i= 0 ; i<articles.length; i++)
    {
      var article = articles[i];
      $nytElem.append('<li class="articles">'+
      '<a href="'+article.web_url+'">'+article.headline.main+
      '</a>'+
      '<p>'+article.snippet+ '</p>' +
      '</li>');
    }
  });


  var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + citystr +
  '&format=json&callback=wikiCallback';

  $.ajax({
    url: wikiUrl,
    dataType: "jsonp",
    success: function(response){
      var articlelist = response[1];

      for(var i = 0; i<articlelist.length; i++)
      {
        articlestr = articlelist[i];
        var url = 'http://en.wikipedia.org/wiki/' + articlestr ;
        $wikiElem.append('<li><a href="'+ url+'">'+
        articlestr + '<a></li>');
      }

    }
  });
  return false;
};

$('#form-container').submit(loadData);
