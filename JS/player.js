

    function createPlayer(){

        grid.appendChild(player);        
        player.classList.add('player');

        player_leftSpace = platforms_array[0].left; // init player in first platform.
        player.style.left = player_leftSpace + 'px';
        player.style.bottom = player_bootomSpace + 'px';
    }