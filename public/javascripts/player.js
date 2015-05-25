/**
 * Created by Andrew on 25/05/2015.
 */
var Player = function(){

    this.gold = 500;
    this.lives = 10;

    var loseLife= function(){
        this.lives = this.lives--;
    };

    var deductGold = function (amount){
        this.gold = this.gold - amount;
    };

    var grantGold = function(amount){
        this.gold = this.gold + amount;
    };

    return {
        deductGold : deductGold,
        grantGold : grantGold,
        loseLife: loseLife,
        gold : this.gold,
        lives : this.lives
    };


};