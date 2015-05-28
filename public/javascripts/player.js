/**
 * Created by Andrew on 25/05/2015.
 */
var Player = function(){

    this.gold = 500;
    this.lives = 10;

    var loseLife= function(){
        this.lives --;
        UiSingleton.getInstance().updateLives();
    };

    var deductGold = function (amount){
        if(this.gold < amount){
            console.log("Insufficient gold , can't build");
            return false;
        }
        this.gold = this.gold - amount;
        return true;
    };

    var grantGold = function(amount){
        this.gold = this.gold + amount;
        UiSingleton.getInstance().updateGold();

    };

    return {
        deductGold : deductGold,
        grantGold : grantGold,
        loseLife: loseLife,
        gold : this.gold,
        lives : this.lives
    };


};