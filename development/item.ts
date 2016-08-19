class Item{
    public cursed: boolean = false;
    public location: string;

    private div: HTMLElement;
    private x: number;
    private y: number;
    

    constructor(){
        this.cursed = false;
        this.div = document.createElement("div");
        document.body.appendChild(this.div);
        this.div.setAttribute("id", "chest");

        this.pickSpawnPoint();        

        let target = document.getElementById("chest");
        target.style.transform = "translate(" + this.x + "%," + this.y + "%)";
    }


    private pickSpawnPoint(){
        let rando = Math.floor ((Math.random() * 3) + 1);
        if(rando == 1){
            this.x = 1240;
            this.y = 350;
            this.location = "forest";
        }

        else if(rando == 2){
            this.x = 2400;
            this.y = 1050;
            this.location = "cave";
        }

        else if(rando == 3){
            this.x = 1645;
            this.y = 1610;
            this.location = "graveyard";
        }
    }
}