   
    

    // Elements
    const grid = document.querySelector('.grid');
    const player = document.createElement('div');
    const num_platforms = 5;

    let platforms = [];

    // States
    let isGameOver = false;

    // Moviments
    let player_leftSpace = 50;
    let player_bootomSpace = 250;
    let upTimerId;
    let downTimerId;


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

        player.style.left = player_leftSpace + 'px';
        player.style.bottom = player_bootomSpace + 'px';
    }

    function createPlataforms(){

        for(let i = 0; i < num_platforms; i++){
            let platformsSpace = 600 / num_platforms;
            let platformsSpace_bottom = 100 + i * platformsSpace;

            let currentPlataform = new Platform(platformsSpace_bottom);
            platforms.push(currentPlataform);
            console.log(platforms);
        }
    }

    function movePlatforms(){
        if(player_bootomSpace > 200){
            platforms.forEach(platforms => {
                platforms.bottom -= 4;
                let visual = platforms.visual;
                visual.style.bottom = platforms.bottom + 'px';
            });
        }
    }

    function jump(){
        clearInterval(downTimerId);
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
        downTimerId = setInterval(function (){
            player_bootomSpace -= 5;
            player.style.bottom = player_bootomSpace + 'px';
            if(player_bootomSpace <= 0){
                gameOver();
            }
        }, 30);
    }

    function gameOver(){
        console.log('game over');
        isGameOver = true;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
    }

    function start(){

        if(!isGameOver){
            createPlayer();
            createPlataforms();
            setInterval(movePlatforms, 30);
            jump();
        }
    }

    start();

    
