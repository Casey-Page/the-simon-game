// Arrays
const blockColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userPattern = [];

let started = false;
let level = 0;
let incorrectSound = new Audio('sounds/wrong.mp3');
let score = 0
let highScore = 0;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  
  $('*').tap(function () {
    if(!started) {
      $('#level-heading').text('Level ' + level);
      nextSequence();
      started = true;
    }
  });
}

else{
  // false for not mobile device
  
  // Start game on keydown
  $('*').keydown(function() {
    if(!started) {
      $('#level-heading').text('Level ' + level);
      nextSequence();
      started = true;
    }
  });
}

// Create the next sequence
function nextSequence() {

  userPattern = [];

  // Increment level each sequence
  level++;
  
  $('#level-heading').text('Level ' + level);

  // Select random colour and add it to the 'gamePattern' array
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColour = blockColours[randomNumber];
  gamePattern.push(randomColour);
    
  // Select colour by ID, play animation and sound relavent to colour  
  $('#' + randomColour).fadeOut(200).fadeIn(200);
  playSound(randomColour);
  console.log(gamePattern);
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  $('.block').tap(function () {

    // Set user colour to the id attribute
    let userColour = $(this).attr('id');
    userPattern.push(userColour);
  
    playSound(userColour);
    animatePress(userColour);
    checkAnswer(userPattern.length-1);
  });
}

else {

// Handler function to detect when any block is clicked    
  $('.block').click(function () {

    // Set user colour to the id attribute
    let userColour = $(this).attr('id');
    userPattern.push(userColour);

    playSound(userColour);
    animatePress(userColour);
    checkAnswer(userPattern.length-1);
  });
}

// Check if userPattern matches gamePattern
function checkAnswer(currentLevel) {

  // Check index's match
  if(userPattern[currentLevel] === gamePattern[currentLevel]) {

    // Check array lengths match
    if(userPattern.length === gamePattern.length) {
      score++;

      if (score > localStorage.getItem(highScore)) {
        highScore = score;
        localStorage.setItem('highScore', score);
        console.log(highScore);
      }

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    incorrectSound.play();
    $('body').addClass('game-over');
    $('#level-heading').text('Incorrect!');
    
    setTimeout(function () {
      $('body').removeClass('game-over');
      $('#level-heading').text('Press any key to restart.');
    }, 800);

    restartGame();
  }
}

// Reset variables to restart game
function restartGame() {
  gamePattern = [];
  score = 0;
  level = 0;
  started = false;
}

function playSound(name) { 

  // Play different sound based on the blocks colour
    let sound = new Audio('sounds/' + name + '.mp3');
    sound.play();
}

function animatePress(currentColour) {

  // Add / Remove classes for animation effect
  $('#' + currentColour).addClass('pressed');
  setTimeout ( function () {
    $('#' + currentColour).removeClass('pressed');
  }, 200);
}
