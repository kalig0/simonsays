const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;
let highScore = 0;
let gameOverMsg = "";

$("#title").click(function() {
  if (!started) {
    $("#title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    gameOverMsg="Game Over. Your Highest Level is " + highScore + ". Press Here to Restart";
    $("body").addClass("game-over");
    $("#title").text(gameOverMsg);

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  gamePattern = [];
  highScore = (level>highScore)?level:highScore;
  level++;


  $("#title").text("Current Level: " + level +" <---> Highest Level: " + highScore);

  var randomNumber;
  var randomChosenColor;
  for (let i = 0; i < level; i++) {
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

  };
  gamePattern.forEach((Color, index)=>{
    setTimeout(function() {
        $("#" + Color).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(Color);
      },
      1000*(index+1))
  })
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
