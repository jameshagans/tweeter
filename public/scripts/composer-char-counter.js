$(document).ready(function() {
  $('#tweet-text').on('input', function(e)  {
    const inputLength = $(this).val().length;
    let tweetCount = $(this).parent().find('.counter');
    
     //use input length to update tweetCount
    let newCount = $(tweetCount).val(140 - inputLength);
    newCount;
    if (newCount.val() < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  })
});


// let length = $(this).val().length;
//       let update = $(counter).val(140 - length);
//       update; 



      // $(document).ready(function () {
      //   // --- our code goes here --- 
      //   document
      //     .querySelector("#tweet-text")
        //   .addEventListener("input", function (event) {
        //     let counter = $(this).parent().children().find(".counter");
        //     let length = $(this).val().length;
        //     let update = $(counter).val(140 - length);
        //     update; 

        //     if (update.val() < 0) {
        //       $(".counter").css("color", "red");
        //     } else {
        //       $(".counter").css("color", "black");
        //     }
        //   }); 
        // })