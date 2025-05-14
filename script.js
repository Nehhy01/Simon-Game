const buttonColours = ["red", "blue", "green", "yellow"];
var gamePatterns = [];
var userClickedPattern = [];
var randomChosenColor;
var level;
var hasGameStarted = true;
 

$("body").keypress(function() {
    if (hasGameStarted) {
        level = 1;
        gamePatterns = [];
        
        userClickedPattern = [];
        $("#level-title").text("Level " + level)
        setTimeout(() => {

            nextSequence();
        }, 500)
        hasGameStarted = !hasGameStarted;
    }
})


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColours[randomNumber];
    gamePatterns.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);

}

var buttons = $(".btn");
buttons.click(function () {
        var userChosenColour = $(this).attr("id");
        playSound(userChosenColour)
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1 );

})


function checkAnswer(currentLevel) {
    console.log(gamePatterns);
    console.log(userClickedPattern);


    
    if (gamePatterns[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if ((userClickedPattern.length) === (gamePatterns.length)) {
            setTimeout(function () {
                level++;
                $("#level-title").text("Level " + level);

                setTimeout(function () {
                    nextSequence()
                    userClickedPattern = [];
                }, 500);
            }, 1000);
        }


    }
    else {
        console.log("failure");
        playSound("wrong"); 
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");    
        }, 200) 

        $("#level-title").text("Game Over, Press Any Key to Restart");

        $(document).keypress(function() {
                hasGameStarted = !hasGameStarted;
        })
    }
}

















function playSound(name) {
    var sound = new Audio(`./sounds/${name}.mp3`);
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}