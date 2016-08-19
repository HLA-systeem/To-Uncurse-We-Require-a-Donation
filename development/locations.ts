class Locations{
    public churchMoney: boolean = false;
    public churchAccount: number = 0;

    private div: HTMLElement;
    private posX: number;
    private posY: number;

    constructor(){
        this.create();
    }

    private create():void{
        for(let i = 0; i<5; i+=1){
            this.div = document.createElement("div");
            document.body.appendChild(this.div);
            if(i == 0){
                this.div.setAttribute("id", "forest");
                let target = document.getElementById("forest");
                let x = 1330;
                let y = -580; 
                target.style.transform = "translate(" + x + "%," + y + "%)";
                }
            else if(i == 1){
                this.div.setAttribute("id", "town");
                let target = document.getElementById("town");                
                let x = 1885;
                let y = -580;         
                target.style.transform = "translate(" + x + "%," + y + "%)";
                }
            else if(i == 2){
                this.div.setAttribute("id", "church");
                let target = document.getElementById("church");                
                let x = 870;
                let y = 55;              
                target.style.transform = "translate(" + x + "%," + y + "%)";
                }
            else if(i == 3){
                this.div.setAttribute("id", "cave");
                let target = document.getElementById("cave");                
                let x = 1945;
                let y = 55;           
                target.style.transform = "translate(" + x + "%," + y + "%)";
                }
            else{
                this.div.setAttribute("id", "graveyard");
                let target = document.getElementById("graveyard");                
                let x = 1230;
                let y = 490;                
                target.style.transform = "translate(" + x + "%," + y + "%)";
                }                                                                
            }
    }
}