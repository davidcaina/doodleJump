   
    

    // Elements
    const grid = document.querySelector('.grid');
    const player = document.createElement('div');
    const num_platforms = 5;

    let platforms_array = [];
    let score = 0;
    

    // States
    let isGameOver = false;

    // Moviments
    let player_leftSpace = 50;
    let player_startPoint = 150;
    let player_bootomSpace = player_startPoint;
    
    let upTimerId;
    let downTimerId;
    let leftTimerId;
    let rightTimerId;

    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;


   // Platform Class
   class Platform{
       constructor(platformsSpace_bottom){

           this.bottom = platformsSpace_bottom;
           this.left = Math.random() * 315;
           this.visual = document.createElement('div');

           const visual = this.visual;
           visual.classList.add('platform');
           visual.style.left = this.left + 'px';
           visual.style.bottom = this.bottom + 'px';

           grid.appendChild(visual);
       }
   }

    function createPlayer(){

        grid.appendChild(player);        
        player.classList.add('player');

        player_leftSpace = platforms_array[0].left; // init player in first platform.
        player.style.left = player_leftSpace + 'px';
        player.style.bottom = player_bootomSpace + 'px';
    }

    function createPlataforms(){

        for(let i = 0; i < num_platforms; i++){
            let platformsSpace = 600 / num_platforms;
            let platformsSpace_bottom = 100 + i * platformsSpace;

            let currentPlataform = new Platform(platformsSpace_bottom);
            platforms_array.push(currentPlataform);
            console.log(platforms_array);
        }
    }

    function movePlatforms(){
        if(player_bootomSpace > 200){
            platforms_array.forEach(platforms => {
                platforms.bottom -= 4;
                let visual = platforms.visual;
                visual.style.bottom = platforms.bottom + 'px';

                if(platforms.bottom < 10){
                    let firstPlatform = platforms_array[0].visual;
                    firstPlatform.classList.remove('platform');
                    platforms_array.shift();
                    score++;
                    let newPlatform = new Platform(600);
                    platforms_array.push(newPlatform);
                }
            });
        }
    }

    function jump(){
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function() {
            player_bootomSpace += 20;
            player.style.bottom = player_bootomSpace + 'px';

            if(player_bootomSpace > 350){
                fall();
            }
        }, 30);
    }

    function fall(){
        clearInterval(upTimerId);
        isJumping = false;
        downTimerId = setInterval(function (){
            player_bootomSpace -= 5;
            player.style.bottom = player_bootomSpace + 'px';
            if(player_bootomSpace <= 0){
                gameOver();
            }

            platforms_array.forEach(platform => {
                if((player_bootomSpace >= platform.bottom) && 
                   (player_bootomSpace <= platform.bottom + 15) &&
                   ((player_leftSpace + 60) >= platform.left) &&
                   (player_leftSpace <= (platform.left + 85)) &&
                   (!isJumping)){
                    console.log('OK');
                    player_startPoint = player_bootomSpace;
                    jump();
                    }
            });
        }, 30);
    }

    function gameOver(){
        console.log('game over');
        isGameOver = true;
        while(grid.firstChild){
            grid.removeChild(grid.firstChild);
        }

        grid.innerHTML = score;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
    }


    function controls(e){
        if(e.key == 'ArrowLeft'){
            moveLeft();
        }else if(e.key == 'ArrowRight'){
            moveRight();
        }else if(e.key == 'ArrowUp'){
            moveUp();
        }
    }


    function moveLeft(){
        if(isGoingRight){
            clearInterval(rightTimerId);
            isGoingRight = false;
        }
        if(isGoingLeft){
            return;
        }
        isGoingLeft = true;
        leftTimerId = setInterval(function(){
            if(player_leftSpace >= 0){            
            player_leftSpace -=5;
            player.style.left = player_leftSpace + 'px';
            }
            else{
                moveRight();
            }
        },20);
    }

    function moveRight(){
        if(isGoingLeft){
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }

        if(isGoingRight){
            return;
        }
        isGoingRight = true;
        rightTimerId = setInterval(function(){
            if(player_leftSpace <= 340){
                player_leftSpace +=5;
                player.style.left = player_leftSpace + 'px';
            }
            else{
                moveLeft();
            }
        },20);
    }

    function moveUp(){
        isGoingLeft = false;
        isGoingRight = false;
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
    }

    function start(){
        if(!isGameOver){
            createPlataforms();
            createPlayer();
            setInterval(movePlatforms, 30);
            jump();
            document.addEventListener('keyup', controls);
        }
    }
    start();

    
