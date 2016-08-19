/// <reference path="hero.ts"/>
//komt op elke schat af.
//gameover voor player bij collison als met item.

class Fritz extends Hero{

    constructor(){
        super("fritz");
        this.x = 2005;
        this.y = 115; 
        this.location = "town";
        }

        public selectGoal(){
        let rando = Math.floor ((Math.random() * 20) + 1);

        if (this.heldItem == true){
            this.goToChurch();
            }

        else{ //Decision tree
            if(this.location == "town"){
                this.move("church");
                }

            else if(this.location == "graveyard"){
                this.move("town");
                }

            else if(this.location == "forest" && rando != 13){
                this.move("cave");
                }

            else if(this.location == "cave" && rando <= 10){
                this.move("forest");
                }

            else if(this.location == "cave" && rando > 10){
                this.move("church");
                }

            else if(this.location == "forest" && rando == 13){
                this.move("graveyard");
                }

            else if(this.location == "church" && rando <= 10){
                this.move("town");
                }

            else{
                this.move("cave");
                }    
            } 
              
        }

}