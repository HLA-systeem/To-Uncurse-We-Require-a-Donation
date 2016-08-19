class Hero{
    public location:string;
    public heldItem: boolean = false;
    
    protected div: HTMLElement;
    protected x: number;
    protected y: number;
    
    

    constructor(heroName:string){
        this.heldItem = false;
        this.div = document.createElement("div");
        document.body.appendChild(this.div);
        this.div.setAttribute("id", heroName);
        }

    public draw(heroName:string):void{
        let target = document.getElementById(heroName);
        target.style.transform = "translate(" + this.x + "%," + this.y + "%)";
        }

    public move(goal:string){ 
        if (goal == "forest"){
            this.x = 1343;
            this.y = 115;
            this.location = "forest";
            }

        else if (goal == "town"){
            this.x = 2005;
            this.y = 115;
            this.location = "town";
            }    

        else if (goal == "church"){
            this.x = 1085;
            this.y = 430;
            this.location = "church";
            } 

        else if (goal == "cave"){
            this.x = 2255;
            this.y = 430;
            this.location = "cave"; 
            } 

        else if (goal == "graveyard"){
            this.x = 1645;
            this.y = 650;
            this.location = "graveyard";
            } 
        }
               
    protected goToChurch(){
        
        if(this.location == "forest"){
            this.x = 2255;
            this.y = 430;
            this.move("cave");
            }

        else if (this.location == "graveyard"){
            this.x = 2005;
            this.y = 115;
            this.move("town");
            }
        
        else{
            this.x = 1085;
            this.y = 430;            
            this.move("church");
            }
        }   
    }
