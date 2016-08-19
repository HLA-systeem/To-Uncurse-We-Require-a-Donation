class PlayerInfo{
    private div: HTMLElement;
    private p: HTMLElement;
    private x: number;
    private y: number;

    constructor(){
        this.div = document.createElement("div");
        this.div.setAttribute("id", "info");  

        this.p = document.createElement("p");
        this.p.setAttribute("id", "infoInner");

        this.div.appendChild(this.p);
        document.body.appendChild(this.div);
        }

     public draw(days:number,money:number):void{
        let targetInner = document.getElementById("infoInner");
        targetInner.innerHTML = "Day: " + days;
        targetInner.innerHTML += "</br>Money: " + money;
        }
}