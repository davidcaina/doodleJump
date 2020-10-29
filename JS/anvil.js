
   // Anvil Class
   class Anvil{
    constructor(startingPos){

        this.bottom = 600;
        this.left = startingPos;
        this.anvil_visual = document.createElement('div');

        const anvil_visual = this.anvil_visual;

        anvil_visual.classList.add('anvil');
        anvil_visual.style.left = startingPos - 6 + 'px';
        anvil_visual.style.bottom = this.bottom + 'px';
        grid.appendChild(anvil_visual);
    }
}


function createWarningArrow(number, delay, startPos){
    const arrow = document.createElement('i');
    arrow.classList.add('arrow');
    arrow.classList.add('down');
    grid.appendChild(arrow);

    //let warningPos = Math.random() * 315;
    arrow.style.left = startPos + 'px';

    for(var i=0; i<number; i++){
        $('.arrow').fadeOut(delay).fadeIn(delay);
        if(i != number-1){
            $('.arrow').delay(delay);
        }
    }
    $('.arrow').delay(delay*number).queue(function() {
        
        $(this).remove();
        let currentAnvil = new Anvil(startPos);
        anvilTimerId = setInterval(function(){moveAnvil(currentAnvil)}, 30);
    });  
}

function moveAnvil(currentAnvil){
    currentAnvil.bottom -= 5;
    let visual = currentAnvil.anvil_visual;
    visual.style.bottom = currentAnvil.bottom + 'px';

    console.log('BOOTOM: ' + player_bootomSpace +' x '+ currentAnvil.bottom);
    console.log('LEFT: ' + player_leftSpace +' x '+ currentAnvil.left);
    if( (player_bootomSpace == currentAnvil.bottom) && (player_leftSpace == currentAnvil.left)){
        gameOver();
    }

    if(currentAnvil.bottom < 10){
        console.log('aa');
        clearInterval(anvilTimerId);
        $('.anvil').remove();

        console.log('cria novo');
        createWarningArrow(5, 500, player_leftSpace)
    }
}