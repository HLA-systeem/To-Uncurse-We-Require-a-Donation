class Player{
    public x: number;
    public y: number;
    public location: string;

    private div: HTMLElement;

    constructor(){
        this.div = document.createElement("div");
        document.body.appendChild(this.div);
        this.div.setAttribute("id", "player");

        this.x = 1085;
        this.y = 430; 
        this.location = "church"; 
        }

    public draw():void{
        let target = document.getElementById("player");
        target.style.transform = "translate(" + this.x + "%," + this.y + "%)";
        }

    public move(goal:string):Array<boolean | string>{
        if(goal == "forest" && (this.location == "graveyard" || this.location == "cave") ){
            this.x = 1343;
            this.y = 115;
            this.location = "forest";
            return([true,'You have entered the forest.']);
            }

        else if(goal == "town" && (this.location == "church" || this.location == "graveyard") ){
            this.x = 2005;
            this.y = 115;
            this.location = "town";
            return([true, 'You have entered the town of' +'\xa0\xa0' + 'Uzl.']);
            }    

        else if(goal == "church" && (this.location == "town" || this.location == "cave") ){
            this.x = 1085;
            this.y = 430;
            this.location = "church";
            return([true, 'You\'re back at the church.']);
            } 

        else if(goal == "cave" && (this.location == "church" || this.location == "forest") ){
            this.x = 2255;
            this.y = 430;
            this.location = "cave";
            return([true, 'You have entered a cave.']); 
            } 

        else if(goal == "graveyard" && (this.location == "forest" || this.location == "town") ){
            this.x = 1645;
            this.y = 650;
            this.location = "graveyard"; 
            return([true, 'You have entered the nearby graveyard.']);
            }

        else{
            return([false]);
            }           
        }    
    }