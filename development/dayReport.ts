class DayReport{
    private p: HTMLElement;
    private log: boolean = false;
    private target = document.getElementsByTagName("div");
    private target2 = document.getElementsByTagName("body")[0];
    private target3;

    constructor(day:number,playerMove:string,event?:string,eventP?:string,gameOver?:Boolean){
        this.clearScreen();
        this.showLog(day,playerMove,event,eventP,gameOver);
        }


    private clearScreen(){
        for (let i = 0; i < this.target.length; i+=1){
            this.target[i].style.visibility = "hidden";
            }

        this.target2.style.backgroundColor = "black"
        }

    private showLog(day:number,playerMove:string,event?:string, eventP?:string,gameOver?:Boolean){
        this.p = document.createElement("p");
        this.p.setAttribute("id", "log");  

        document.body.appendChild(this.p);

        this.target3 = document.getElementById("log");

        this.target3.innerHTML = "Day " + day +",";
        this.target3.innerHTML += "</br>"+ playerMove;


        if(event){
            if(eventP){
                this.target3.innerHTML += "</br>"+ eventP;
                }
            this.target3.innerHTML += "</br>"+ event;


            if(gameOver){
                setTimeout(this.gameOver,4000);
                }
            }

        else if(eventP){
                this.target3.innerHTML += "</br>"+ eventP;
                }
        else{
            this.target3.innerHTML += "</br>The day passed without anything happening.";
            }

        this.log = true;
        document.addEventListener("click", this.clearLog.bind(this));
        }

    private clearLog(){
        if(this.log){
            document.removeEventListener("click", this.clearLog);
            let target4 = document.getElementsByTagName("body");
            target4[0].removeChild(this.target3);
            this.returnScreen();
            }
        }

    private returnScreen(){
        for (let i = 0; i < this.target.length; i+=1){
            this.target[i].style.visibility = "visible";
            }

        this.target2.style.backgroundColor = "rgb(77,109,109)";
        this.log = false;
        }

    private gameOver(){
        location.reload();
    }
}