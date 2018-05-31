var Game = require('./game.js');

var game = new Game();

document.addEventListener('keydown', function(event){
    game.turnFurry(event);
});


game.showFurry();
game.showBanana();
game.startGame();
