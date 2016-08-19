class Roads{
    private div: HTMLElement;

    constructor(){
        this.create();
        }

    private create():void{
        for(let i = 0; i<5; i+=1){
            this.div = document.createElement("div");
            document.body.appendChild(this.div);
            this.div.setAttribute("id", "road" + i);
            let target = document.getElementById("road" + i);

            if(i == 0){
                let x = 2600;
                let y = 350; 
                target.style.transform = "translate(" + x + "%," + y + "%)";
                target.style.transform += "rotate(55deg)";
                target.style.transform += "scale(1,5)";
                }
            else if(i == 1){
                let x = 3000;
                let y = 250;               
                target.style.transform = "translate(" + x + "%," + y + "%)";
                target.style.transform += "rotate(-55deg)";
                target.style.transform += "scale(1,5)";
                }
            else if(i == 2){
                let x = 2800;
                let y = 295;                
                target.style.transform = "translate(" + x + "%," + y + "%)";
                target.style.transform += "rotate(90deg)";
                target.style.transform += "scale(1,5.3)";
                }
            else if(i == 3){
                let x = 3015;
                let y = 150;              
                target.style.transform = "translate(" + x + "%," + y + "%)";
                target.style.transform += "rotate(18deg)";
                target.style.transform += "scale(1,5.1)";
                }
            else{
                let x = 2535;
                let y = 50;               
                target.style.transform = "translate(" + x + "%," + y + "%)";
                target.style.transform += "rotate(-15deg)";
                target.style.transform += "scale(1,5)";
                }                                                                
            }
        }    
    }