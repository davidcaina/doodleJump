   
    function start(){
        if(!isGameOver){
            createPlataforms();
            createPlayer();
            setInterval(movePlatforms, 30);
            jump();
            document.addEventListener('keyup', controls);
        }
    }
    //start();

    
