var Furry = require('./furry.js');
var Banana = require('./banana.js');

function Game() {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.banana = new Banana();
    this.score = 0;
    var self = this;
    this.index = function (x, y) {
        return x + (y * 10);
    };
    this.showFurry = function () {
        this.board[this.index (this.furry.x, this.furry.y)].classList.add('furry');
    };
    this.hideVisibleFurry = function () {
        var visible = document.querySelector('.furry');
        visible.classList.remove('furry');
    };
    this.showBanana = function () {
        this.board[this.index (this.banana.x, this.banana.y)].classList.add('banana');
    };
    this.moveFurry = function () {
        this.hideVisibleFurry();
        if (this.furry.direction === "right"){
            this.furry.x = this.furry.x + 1;
        }else if (this.furry.direction === "left"){
            this.furry.x = this.furry.x - 1;
        }else if (this.furry.direction === "up"){
            this.furry.y = this.furry.y - 1;
        }else if (this.furry.direction === "down"){
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkBananaCollision();
    };
    this.turnFurry = function (event) {
        switch (event.which){
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };
    // document.addEventListener('keydown', function(event){
    //     self.turnFurry(event);
    // });
    this.checkBananaCollision = function () {
        if (this.furry.x === this.banana.x && this.furry.y === this.banana.y){
            var bananaBox = document.querySelector('.banana');
            bananaBox.classList.remove('banana');
            this.score ++;
            var result = document.querySelector("#score strong");
            result.innerHTML= this.score;
            this.banana = new Banana();
            this.showBanana();
        }
    };
    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){

            document.getElementById('over').classList.remove('invisible');

            var score = document.querySelector('.endScore');
            var strong = document.querySelector('strong');
            score.textContent = strong.textContent;


            document.getElementById('restart').addEventListener('click', function () {
                document.getElementById('over').classList.add('invisible');
                window.location.reload();
            });

            clearInterval(this.idSetINterval);
            this.hideVisibleFurry();


            // document.getElementById('restart').addEventListener('click', function () {
            //     document.getElementById('over').classList.add('invisible');
            //     window.location.reload();
            // });
        }
    };
    this.startGame = function () {
        this.idSetINterval = setInterval(function () {
            self.moveFurry()
        }, 250);
    };
}



module.exports = Game;