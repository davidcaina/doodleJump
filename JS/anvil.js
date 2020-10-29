function createWarningArrow(number, delay){
    const arrow = document.createElement('i');
    arrow.classList.add('arrow');
    arrow.classList.add('down');
    grid.appendChild(arrow);

    let warningPos = Math.random() * 315;
    console.log(warningPos);
    arrow.style.left = warningPos + 'px';

    for(var i=0; i<number; i++){
        $('.arrow').fadeOut(delay).fadeIn(delay);
        if(i != number-1){
            $('.arrow').delay(delay);
        }
    }

    $('.arrow').delay(delay*number).queue(function() { $(this).remove();});
    
}