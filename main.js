"use strict";

const colors = ["#CD5C5C", "#00008B", "#800080", "#800000", "#2E8B57", "#DB7093", "#008080", "#000000", "#FF69B4", "#4682B4"]

var quote = "", author = "";

function getQuote() {

  var promise = Promise.resolve($.ajax({
    headers: {
      'X-Mashape-Key': 'OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V',
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat='
  }) 
      )

    promise.then(response => {
      var r = JSON.parse(response);
      quote = r.quote;
      author = r.author;

      $("#tweet-quote").attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent("''" + quote + "''" + author));

      $("#tumblr-quote").attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=i' + encodeURIComponent(author) + "&content=" + encodeURIComponent(quote));

      var color = ~~(Math.random() * colors.length);

      var quoteP = Promise.resolve($(".quote").animate({opacity: 0}, 500))
        quoteP.then($("#quote-text").text(quote))
        .then($(".quote").animate({opacity: 1}, 500))

        var authorP = Promise.resolve($(".author").animate({opacity: 0}, 500))
        authorP.then($("#author-text").text(author))
        .then($(".author").animate({opacity: 1}, 500))

        $("html body").animate({
          backgroundColor: colors[color],
          color: colors[color]
        }, 1000);

      $("#new-quote").animate({
          backgroundColor: colors[color]
      }, 1000);
  
    })
}  
  $(document).ready(function(){
    getQuote();
    $("#new-quote").on("click", getQuote);
  });

