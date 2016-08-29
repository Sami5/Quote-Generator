"use strict";

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

const colors = ["#CD5C5C", "#00008B", "#800080", "#800000", "#2E8B57", "#DB7093", "#008080", "#000000", "#FF69B4", "#4682B4"]

var quote = "", author = "", twitterURL = "", tumblrURL ="";

function openURL(url) {
  window.open(url, "Share", "width = 550, height = 400, toolbar = 0, scrollbars = 1, location = 0, statusbar = 0, menubar = 0, resizable = 0");
}

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

    // Save quote and author data into variables
    promise.then(response => {
      var r = JSON.parse(response);
      quote = r.quote;
      author = r.author;

      // Set the URL to enable Twitter to post quote
      twitterURL =  "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent("''" + quote + "''" + author);

      // Add hyperlink to Twitter button 
      $("#tweet-quote").attr('href', twitterURL); 

      // Set the URL to enable Tumblr to post quote
      tumblrURL = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=i" + encodeURIComponent(author) + "&content=" + encodeURIComponent(quote);

      // Add hyperlink to Tumblr button
      $("#tumblr-quote").attr('href', tumblrURL); 

      var color = ~~(Math.random() * colors.length);

      // New quote animation
      var quoteP = Promise.resolve(() => $(".quote").animate({opacity: 0}, 500))
        quoteP.then(() => $("#quote-text").text(quote))
        .then(() => $(".quote").animate({opacity: 1}, 500))

        // New author animation
        var authorP = Promise.resolve($(".author").animate({opacity: 0}, 500))
        authorP.then($("#author-text").text(author))
        .then($(".author").animate({opacity: 1}, 500))

        // Background colour animation
        $("html body").animate({
          backgroundColor: colors[color],
          color: colors[color]
        }, 1000);

      // Button color animation
      $(".button").animate({
        backgroundColor: colors[color]
      }, 1000);

    })
}  

$(document).ready(() => {

  getQuote();

  $("#new-quote").on("click", getQuote);

  $("#tweet-quote").on("click", function() {
    if (!inIframe()) {
      openURL(twitterURL);
    }
  });

  $("#tumblr-quote").on("click", function() {
    if (!inIframe()) {
      openURL(tumblrURL);
    }
  });

});

