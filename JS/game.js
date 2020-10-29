   
   
   // Fazer os menus;
   // Fazer bloco cair que mata o player;
   // Arrumar as skins
   
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

    createWarningArrow(5, 500);
