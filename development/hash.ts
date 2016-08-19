/// <reference path="hero.ts"/>
//zoekt naar schatte rond graveyard.
//gameover voorde plater bij collison

class Hash extends Hero{

    constructor(){
        super("hash");
        this.x = 1645;
        this.y = 650; 
        this.location = "graveyard";
        }

    public selectGoal(treasureLocation: string){
        let rando = Math.floor ((Math.random() * 2) + 1);

        if (this.heldItem == true){
            this.goToChurch();
            }

        else if(treasureLocation != null){
            if(treasureLocation == "graveyard"){
                if(this.location == "cave"){
                    this.move("forest");
                    }

                else if(this.location == "forest" || this.location == "town"){
                    this.move("graveyard");
                    }

                else{
                    this.move("town");
                    } 
                }

            else if(treasureLocation == "forest"){
                if(this.location == "church"){
                    this.move("cave");
                    }

                else if(this.location == "cave" || this.location == "graveyard"){
                    this.move("forest");
                    }

                else{
                    this.move("graveyard");
                    } 
                }

            else if(treasureLocation == "cave"){
                if(this.location == "graveyard"){
                    this.move("forest");
                    }

                else if(this.location == "church" || this.location == "forest"){
                    this.move("cave");
                    }

                else{
                    this.move("church");
                    } 
                }
            }    

        else{
            if(this.location == "graveyard"){
                this.move("town");
                }

            else if(this.location == "cave" || this.location == "town" && rando == 1){
                this.move("church");
                }

            else if(this.location == "town"){
                this.move("graveyard");
            }    

            else if(this.location == "church" && rando == 1){
                this.move("town");
                }
            else{
                this.move("cave");
                }    
            } 
              
        }        
}    
