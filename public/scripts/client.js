/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



//document.ready() shorthand 
$(() => {

  //hide the error element on load
  $('.error-section').css('display', 'none');

  //helper function to escape script for XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //function to crete tweet elements layout
  function createTweetElement(tweet) {
    const $tweet =
      $(`<article class="tweet-content">
      <div class="tweetbox-header">
  
        <h4 class="logo"><img src=${tweet.user.avatars} alt="">  <span class="user-name"> ${tweet.user.name || 'User Name'}</span></h4>
        <h4>${tweet.user.handle || 'Header @tag'}</h4>
      </div>
  
      <article class="tweetbox">
  
        <p>
        ${escape(tweet.content.text) || 'Just default test text!'}
        <p>
      </article>
  
      <div class="footer-container">
        <div class="days-container">
          <p>${timeago.format(tweet.created_at)}</p>
        </div>
        <div class="icons-container">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-repeat"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
  
      </div>
    </article>`);

    return $tweet;

  };

  //funtion to render tweet from the DB
  const renderTweets = function(data) {
    // loops through tweets
    for (let tweet of data) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.tweet-container').prepend($tweet);
    }
  };

  // function to get tweets from the DB and render with our function
  const loadTweets = function() {
    $.ajax('/tweets', {
      method: "GET"
    }).then(function(tweets) {
      renderTweets(tweets);
    }).catch((e) => {
      console.log('there was an error');
    });
  };

  loadTweets();


  // actions taken on tweet form submission
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    let formValue = $('#tweet-text');

    if (formValue.val() === '' || formValue.val() === null) {
      $('.error-section').slideDown(700).css('display', 'flex');

      $('.error-msg').text('You need to enter a valid input');
      setTimeout(() => {
        $('.error-section').slideUp(700);

      }, 2500);

    } else if (formValue.val().length > 140) {
      $('.error-section').slideDown(700).css('display', 'flex');

      $('.error-msg').text('Too many characters! Twwets require 140 characters or less');
      setTimeout(() => {
        $('.error-section').slideUp(700);

      }, 2500);
    }
    else {

      const formData = $(this).serialize();
      $('.tweet-container').empty();
      $.ajax({
        method: "POST",
        url: '/tweets',
        data: formData
      }).then((tweet) => {
        $('#tweet-text').val('');
        $('.counter').val(140);
        $('.error-section').css('display', 'none');

        loadTweets();

      });
    }
  });

  //document ready closing
});


