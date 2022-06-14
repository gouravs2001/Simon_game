var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var keyTrack=0;
var score=0;
var remainingColors;
//start game

$(document).on("keypress",function(){
  if(keyTrack===0)
  {
    nextSequence();
    $("#level-title").hide()
    $(".rules").hide();
    $(".score").html("Score <br> "+score);

  }
})

$('#level-title').on("click",function(){
  if(keyTrack===0)
  {
    nextSequence();
    $("#level-title").hide()
    $(".rules").hide();
    $(".score").html("Score <br> "+score);
  }
})

//creating sequence

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  //Storing gamepattern

  gamePattern.push(randomChosenColour);

  //showing pattern

  $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
  //play sound
  playSound(randomChosenColour);

  keyTrack=1;

  remainingColors=gamePattern.length;

  $(".track").html("Colours Left " + remainingColors);

  
}

//Storing user input pattern

$(".btn").click(function () {
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  remainingColors--;
  $(".track").html("Colours Left "+remainingColors);
  if(gamePattern.length===userClickedPattern.length) checkanswer();
});

//Playing Audio

function playSound(name) {
  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();
}

//btn press animation
function animatePress(currentColour)
{
  $('#'+currentColour).addClass('pressed');
  setTimeout(function(){$('#'+currentColour).removeClass('pressed')},100);
}


//check player answer
function checkanswer()
{
  let isEqual =gamePattern.toString()===userClickedPattern.toString();
  if(isEqual===true){
    userClickedPattern=[];
    setTimeout(function(){nextSequence()},1000);
    score=score+gamePattern.length;
    $(".score").html("Score <br> "+score);
  }
  else gameOver();
}

//gameOver Restart
function gameOver()
{
  $("#level-title").html("Game Over Press any Key or Click here to restart");
  $("#level-title").show();
  playSound('wrong');
  score=0;
  keyTrack=0;
  gamePattern=[];
  userClickedPattern=[];
  $('body').addClass("game-over");
  setTimeout(function(){$('body').removeClass("game-over")},200);
  $(".rules").show();
}
