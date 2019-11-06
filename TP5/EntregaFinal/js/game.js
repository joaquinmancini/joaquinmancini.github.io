"use strict";

  window.onload = move;

  //Player
  var player = document.getElementById("player");
  
  //Enemy
  var fireball = document.getElementById("fireball");
  //Audio
  var track = document.getElementById("track");
  var deadTrack = document.getElementById("deadTrack");
  //--BG VARIABLES--//
  var rocks = document.getElementById("rocks");
  var hills = document.getElementById("hills");
  var castle = document.getElementById("castle");
  var clouds = document.getElementById("clouds");
  var ground = document.getElementById("ground");
  var trees = document.getElementById("trees");
  var g_o = document.getElementById("gameOver");
  var playAgain = document.getElementById("playAgain");
  //--//
  
  function playTruck() {
    track.play();
  }
  function stopTrack(){
    track.pause();
  }
  function playDeadTrack(){
    deadTrack.play();
  }
  
  
  function gameOver() {
    dead();
    setTimeout(gameOverBG, 1500);
  }
  
  //--PLAYER MOVES--//
  function move() {
    player.style.position = "relative";
  }
  function getKeyAndMove(e) {
    var key_code = e.which || e.code;
    switch (key_code) {
      case 87: // W key
        jump();
        setTimeout(run, 800);
        break;
      case 13: // Enter key
        playTruck();
        startGameBG();
        startEnemy();
        break;
    }
  }
  
  function jump() {
    player.className = "jump";
  }
  function run() {
    player.className = "player";
  }
  function dead() {
    player.className = "dead";
    stopTrack()
    playDeadTrack()
    
  }
  //--END PLAYER MOVES--//
  
  stopEnemy();
  
  //--GAME LOOP--//
  function gameLoop() {
    if (colision()) {
      gameOver();
      stop();
      
    }
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
  //////////////////////////
  function startGameBG() {
    startGame.style.visibility = "hidden";
  }
  function gameOverBG() {
    g_o.style.visibility = "visible";
    playAgain.style.visibility = "visible";
  }
  
  function animationStart() {
    ground.style.webkitAnimationPlayState = "running";
    castle.style.webkitAnimationPlayState = "running";
    clouds.style.webkitAnimationPlayState = "running";
    trees.style.webkitAnimationPlayState = "running";
    rocks.style.webkitAnimationPlayState = "running";
    hills.style.webkitAnimationPlayState = "running";
  }
  function animationPaused() {
    ground.style.webkitAnimationPlayState = "paused";
    castle.style.webkitAnimationPlayState = "paused";
    clouds.style.webkitAnimationPlayState = "paused";
    trees.style.webkitAnimationPlayState = "paused";
    rocks.style.webkitAnimationPlayState = "paused";
    hills.style.webkitAnimationPlayState = "paused";
    fireball.style.webkitAnimationPlayState = "paused";
  }
  function start() {
    animationStart();
  }
  function stop() {
    animationPaused();
  }
  function stopEnemy() {
    fireball.style.animationPlayState = "paused";
  }
  function startEnemy() {
    fireball.style.animationPlayState = "running";
  }
  
  function colision() {
    var player = document.getElementById("player");
    var fireball = document.getElementById("fireball");
    //PLAYER
    var x1 = player.getBoundingClientRect().left;
    var y1 = player.getBoundingClientRect().top;
    var playerW = player.getBoundingClientRect().width;
    var playerH = player.getBoundingClientRect().height;
    //ENEMY
    var x2 = fireball.getBoundingClientRect().left;
    var y2 = fireball.getBoundingClientRect().top;
    var fireballW = fireball.getBoundingClientRect().width;
    var fireballH = fireball.getBoundingClientRect().height;
  
    if (
      x1 < x2 + fireballW &&
      x1 + playerW > x2 &&
      y1 < y2 + fireballH &&
      playerH + y1 > y2
    ) {
      return true;
    }
  }
  

