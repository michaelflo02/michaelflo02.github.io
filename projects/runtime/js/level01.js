var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1,
            speed: -5,
            gameItems: [
//                {type: 'enemy',x:900,y:groundY},
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:700,y:320},
                {type: 'sawblade',x:900,y:350},
                {type: 'sawblade',x:1400,y:345},
                {type: 'sawblade',x:1200,y:450},
                {type: 'sawblade',x:100,y:300},
                  {type: 'enemy',x:1400,y:45},
                {type: 'enemy',x:1200,y:50},
                {type: 'enemy',x:400,y:30},
                {type: 'reward',x:600,y:groundY-350},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
       
       
        // TODO 8 & 9: Level Data
       

       // TODO 10: Roll Your Own Obstacles
        function createBox(x,y) {
        var box = game.createObstacle(hitZoneSize,damageFromObstacle);
            box.x = x;
            box.y = y;
            game.addGameItem(box);
        var boxImage = draw.bitmap('https://pngriver.com/wp-content/uploads/2018/04/Download-Popcorn-PNG-Photos.png');    
            boxImage.scaleX = 0.1;
            boxImage.scaleY = 0.1;
            box.addChild(boxImage);
            boxImage.x = -25;
            boxImage.y = -25;
        }
   
       
        // TODO 11: Enemies!
   function createEnemy(x, y){
     
     
        var enemy =  game.createGameItem('enemy',80);
        enemy.x = x;
        enemy.y = groundY - y;
        game.addGameItem(enemy);
        enemy.velocityX = -1;
       
        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
           enemy.onPlayerCollision = game.changeIntegrity(-55);
         
        };
        enemy.onProjectileCollision = function() {
           console.log("Halle has hit the enemy");
           enemy.onProjectileCollision = game.increaseScore(150);
           enemy.fadeOut();
        };
        var redSquare = draw.bitmap('data:image/jpeg;base64,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');
        redSquare.scaleX = 0.8;
        redSquare.scaleY = 0.8;
        enemy.addChild(redSquare);
        redSquare.x = -75;
        redSquare.y = -75;
        }   
        


       function createReward(x, y){
           var reward = game.createGameItem('reward', 25);
           reward.x = x;
           reward.y = groundY - y;
           game.addGameItem(reward);
           reward.velocityX = -2;
           var rewardImg = draw.bitmap('http://www.pngmart.com/files/1/Pepperoni-Pizza.png');
           rewardImg.scaleX = 0.1;
           rewardImg.scaleY = 0.1;
           reward.onPlayerCollision = function() {
               console.log('Halle has collected a reward');
               reward.onPlayerCollision = game.increaseScore(1500);
               reward.fadeOut();
           };
           
           reward.addChild(rewardImg);
           rewardImg.x = -40;
           rewardImg.y = -30;
           
       }
        for (var j = 0; j < levelData.gameItems.length; j++){
            var gameItem = levelData.gameItems[j];
            if (levelData.gameItems[j].type === 'sawblade'){
            createBox(gameItem.x, gameItem.y);
            }
            if (levelData.gameItems[j].type === 'enemy'){
            createEnemy(gameItem.x, gameItem.y);
            }
            if (levelData.gameItems[j].type === 'reward'){
            createReward(gameItem.x, gameItem.y);
            }
       }
       
       
    };
    
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}