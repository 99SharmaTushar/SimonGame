var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var flag=1,level=0,subLevel=0;

function nextSequence()
{
  var randomNumber= Math.floor((Math.random()*4));
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeToggle(100).fadeToggle(100);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level "+level);
}

$(".btn").click(function(){
  var userChosenColor=this.id;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userChosenColor);
});

$(document).keydown(function(){
  if(flag==1)
  {
    flag=0;
    nextSequence();
    $("#level-title").text("Level "+level);
  }
});

function checkAnswer(color)
{
  if(color==gamePattern[subLevel])
  {
    subLevel++;
    if(subLevel==level)
    {
      subLevel=0;
      setTimeout(nextSequence,1000);
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over , Press any key to Restart...")
    startOver();
  }
}

function playSound(color)
{
  var audio=new Audio("sounds/"+color+".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}

function startOver()
{
  flag=1;
  level=0;
  subLevel=0;
  gamePattern=[];
}
