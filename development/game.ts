class Game {
    private player: Player;
    private fritz: Fritz;
    private hash: Hash;
    private locations: Locations;
    private playerInfo: PlayerInfo;
    private dayReport: DayReport;
    private event: string;
    private eventP: string;
    private gameOver: boolean = false;
    private item: Item;

    private days: number = 1;
    private money: number = 400;
 
    public playerTurn: boolean = true;
    private nextMove: Array<boolean | string> = [false];
     
    constructor(){
        new Roads();
        this.locations = new Locations();
        
        this.player = new Player();
        this.fritz = new Fritz();
        this.hash = new Hash();
        this.item = new Item();
        
        this.playerInfo = new PlayerInfo();
        
        document.getElementById("forest").addEventListener("click",(e) => this.playerMove(e));
        document.getElementById("town").addEventListener("click",(e) => this.playerMove(e));
        document.getElementById("church").addEventListener("click",(e) => this.playerMove(e));
        document.getElementById("cave").addEventListener("click",(e) => this.playerMove(e));
        document.getElementById("graveyard").addEventListener("click",(e) => this.playerMove(e));

        requestAnimationFrame(this.gameLoop.bind(this));
        }
    
    private gameLoop(): void{
        this.player.draw();
        this.fritz.draw("fritz");
        this.hash.draw("hash");
    
        this.playerInfo.draw(this.days,this.money);
        
        requestAnimationFrame(this.gameLoop.bind(this)); 
        }

    private playerMove(e:Event):void{
         if(this.playerTurn == true){  
            this.nextMove = this.player.move(e.target.id);
            }

         if(this.nextMove[0] == true){
             this.playerTurn = false;
             this.money -= 50;
             this.nextMove[0] = false;
             setTimeout(this.fritzMove.bind(this) ,1000);
             }
         } 

    private fritzMove():void{
         this.fritz.selectGoal();
         setTimeout(this.hashMove.bind(this) ,1000); 
         }

    private hashMove():void{
         let intel = null;
         if(this.item != null){
             intel = this.item.location;
            }
         this.hash.selectGoal(intel);
         setTimeout(this.nextDay.bind(this) ,2000);
         }                 

    private nextDay():void{
        this.pickEvent();
        this.days +=1;
        this.dayReport = new DayReport(this.days,String( this.nextMove[1]),this.event,this.eventP,this.gameOver);

        if(this.item == null && this.fritz.heldItem == false && this.hash.heldItem == false){
            this.item = new Item();
            }

        this.event = null;
        this.eventP = null;
        this.playerTurn = true;   
        }

    private pickEvent(){
        if (!this.event || this.event == null){this.event = this.hashDeath();}
        if (!this.event || this.event == null){this.event = this.fritzSawCurse();}
        if (!this.event || this.event == null){this.event = this.ending();}

        if (!this.eventP || this.eventP == null){this.eventP = this.moneyTransfer();}

        if (!this.event || this.event == null){this.event = this.noMoney();}
        if (!this.event || this.event == null){this.event = this.unCurseHash();}
        if (!this.event || this.event == null){this.event = this.unCurseFritz();}

        if(this.item!=null){
            if (!this.event || this.event == null){this.event = this.curseItem();}
            if (!this.event || this.event == null){this.event = this.hashGotItem();}
            if (!this.event || this.event == null){this.event = this.fritzGotItem();}
            }

        
        }

    private noMoney(): string{
        if(this.money <= 0){
            this.eventP = "";
            this.gameOver = true;
            return("You ran out of money for travelng.</br>\xa0\xa0\xa0\xa0 GAME OVER");
            }
        }

    private ending(){
        if(this.days > 30){
            this.gameOver = true;
            return("You've succesfully cursed your way through the month of random treasure spawning.</br>\xa0\xa0\xa0\xa0 Thanks for playing.");
            }
        }

    private curseItem(){
        if( (this.player.location == this.item.location) && this.item.cursed == false){
            this.item.cursed = true;
            return("You found an item and cursed it.");
            }
        }
    
    private hashGotItem(){
        if( (this.hash.location == this.item.location) && this.item.cursed == true){
            this.item = null;
            let target = document.getElementsByTagName("body");
            target[0].removeChild(document.getElementById("chest"));
            this.hash.heldItem = true;
            return("Hash has picked up an item, but it's cursed !");
            }

        else if( (this.hash.location == this.item.location) && this.item.cursed == false){
            this.item = null;
            let target = document.getElementsByTagName("body");
            target[0].removeChild(document.getElementById("chest"));
            return("Hash has picked up an item.");
            }
        }

    private unCurseHash(){
        if(this.hash.location == "church" && this.hash.heldItem == true){
            this.hash.heldItem = false;
            this.locations.churchMoney = true;
            this.locations.churchAccount += 500;
            return("Hash entered the church.</br>O benevolent godess, please lift the curse from this man !</br>Hash payed the uncursing fee.");
            }
        }

    private hashDeath(){
        if(this.hash.location == this.player.location){
            if(this.hash.heldItem == true){
                return("You ran into Hash, he is suffering from a curse.");
                }
            else{
                this.gameOver = true;
                return("You ran into Hash, he recognized you as a witch.</br>Hash managed to kill you before you could react.</br>\xa0\xa0\xa0\xa0 GAME OVER");
                }
            }
        }

    private fritzGotItem(){
        if( (this.fritz.location == this.item.location) && this.item.cursed == true){
            this.item = null;
            let target = document.getElementsByTagName("body");
            target[0].removeChild(document.getElementById("chest"));
            this.fritz.heldItem = true;
            return("Fritz has picked up an item, but it's cursed !");
            }

        else if( (this.fritz.location == this.item.location) && this.item.cursed == false){
            this.item = null;
            let target = document.getElementsByTagName("body");
            target[0].removeChild(document.getElementById("chest"));
            return("Fritz has picked up an item.");
            }
        }

    private unCurseFritz(){
        if(this.fritz.location == "church" && this.fritz.heldItem == true){
            this.fritz.heldItem = false;
            this.locations.churchMoney = true;
            this.locations.churchAccount += 500;
            return("Fritz entered the church and payed the uncursing fee.</br>O benevolent godess, please lift the curse from this young man !");
            }
        }

    private fritzSawCurse(){
        if(this.fritz.location == this.player.location){
            if(this.item.location == this.player.location){
                this.gameOver = true;
                return("Fritz saw you curse an item and ran away before you could silence him.</br> The church will cut their ties with you if he informs other people.</br>\xa0\xa0\xa0\xa0 GAME OVER");
                }
            else{
                return("You ran into Hash, he recognized you as a witch.</br>Hash managed to kill you before you could react.</br>\xa0\xa0\xa0\xa0 GAME OVER");
                }
            }
        }
    

    private moneyTransfer(){
        if(this.player.location == "church" && this.locations.churchMoney == true){
            this.locations.churchMoney = false;
            this.money += this.locations.churchAccount;
            let share = this.locations.churchAccount;
            this.locations.churchAccount = 0;
            return("The church gave you " + share + " for your service.");
            }
        }

}

window.addEventListener("load", function(){
    new Game();
    });