
    
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