var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var keyPressed = false;

$(".btn").click(function(){
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);

animatePress(userChosenColour);
playSound(userChosenColour);
checkAnswer(userClickedPattern.length - 1);
});



function nextSequence(){
    userClickedPattern = [];
    level = level+1;
    $("h1").text("Level" + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
       

        setTimeout(function() {
            $("#" + currentColour).classList.remove("pressed");
        }, 100);
}

$(document).keydown(function() {
    if (!keyPressed) {
      keyPressed = true;
      $("h1").text("Level" + level);
      nextSequence();
    }
  });
  function checkAnswer(currentLevel)
  {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(nextSequence, 1000);
        }
    }
    else
    {
        console.log("wrong");
        playSound("wrong");

        $('body').addClass('game-over');

  // Remove the "game-over" class after 200 milliseconds
         setTimeout(function() {
         $('body').removeClass('game-over');
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
  }
  function startOver()
  {
     level = 0;
     gamePattern = [];
     keyPressed = false;
  }
