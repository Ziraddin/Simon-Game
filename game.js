
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;

function nextSequence(){

  var randomNumber = Math.floor(4*Math.random());
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  playSound(randomChosenColour);
  $("#"+randomChosenColour).fadeOut("slow").fadeIn("slow");
  $("#level-title").text("Level "+level);
  level+=1;

}

$(document).one("keydown",function (event){
        nextSequence();

   })

$(".btn").click(function (){


        var userChosenColour = this.id;
        playSound(userChosenColour);
        animatePress(userChosenColour);
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        checkAnswer();
        if(userClickedPattern.length===gamePattern.length)
        {

        nextSequence();
        userClickedPattern = [];
      }

})

function playSound(name){


  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(name){

  $("#"+name).addClass("pressed");
     setTimeout(function (){
        $("#"+name).removeClass("pressed");
      }, 60 );
}

$(".restart").css("visibility","hidden");
function checkAnswer(){


   for(let j=0;j<userClickedPattern.length;j++){

     if(userClickedPattern[j]==gamePattern[j]){

          console.log("success");
     }
     else{

       console.log("fail");
       $("#level-title").text("Game over!");
       $(".btn").removeClass("btn");
       $("body").addClass("game-over");
       setTimeout(function (){
         $("body").removeClass("game-over");
       },150)
       $(".restart").css("visibility","visible");
       $(".restart").click(function (){

         location.reload();
       })
     }

   }
}
