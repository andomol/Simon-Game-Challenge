// Game arrays


var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


//Game Start

$(document).keypress(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// User clicks on colour

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});


//Check Answer

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();

  };

};


// Create a new pattern

function nextSequence() {

  userClickedPattern = []

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

};



// Sound effects and style

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();

};

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed")
  var removedPressed = setTimeout(function() {
    $("." + currentColour).removeClass("pressed")
  }, 100);

};

//User Stars over

function startOver() {
  level = 0;
  gamePattern = []
  started = false;

}
