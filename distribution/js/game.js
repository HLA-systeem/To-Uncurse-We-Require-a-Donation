var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DayReport = (function () {
    function DayReport(day, playerMove, event, eventP, gameOver) {
        this.log = false;
        this.target = document.getElementsByTagName("div");
        this.target2 = document.getElementsByTagName("body")[0];
        this.clearScreen();
        this.showLog(day, playerMove, event, eventP, gameOver);
    }
    DayReport.prototype.clearScreen = function () {
        for (var i = 0; i < this.target.length; i += 1) {
            this.target[i].style.visibility = "hidden";
        }
        this.target2.style.backgroundColor = "black";
    };
    DayReport.prototype.showLog = function (day, playerMove, event, eventP, gameOver) {
        this.p = document.createElement("p");
        this.p.setAttribute("id", "log");
        document.body.appendChild(this.p);
        this.target3 = document.getElementById("log");
        this.target3.innerHTML = "Day " + day + ",";
        this.target3.innerHTML += "</br>" + playerMove;
        if (event) {
            if (eventP) {
                this.target3.innerHTML += "</br>" + eventP;
            }
            this.target3.innerHTML += "</br>" + event;
            if (gameOver) {
                setTimeout(this.gameOver, 4000);
                ;
            }
        }
        else if (eventP) {
            this.target3.innerHTML += "</br>" + eventP;
        }
        else {
            this.target3.innerHTML += "</br>The day passed without anything happening.";
        }
        this.log = true;
        document.addEventListener("click", this.clearLog.bind(this));
    };
    DayReport.prototype.clearLog = function () {
        if (this.log) {
            document.removeEventListener("click", this.clearLog);
            var target4 = document.getElementsByTagName("body");
            target4[0].removeChild(this.target3);
            this.returnScreen();
        }
    };
    DayReport.prototype.returnScreen = function () {
        for (var i = 0; i < this.target.length; i += 1) {
            this.target[i].style.visibility = "visible";
        }
        this.target2.style.backgroundColor = "rgb(77,109,109)";
        this.log = false;
    };
    DayReport.prototype.gameOver = function () {
        location.reload();
    };
    return DayReport;
}());
var Hero = (function () {
    function Hero(heroName) {
        this.heldItem = false;
        this.heldItem = false;
        this.div = document.createElement("div");
        document.body.appendChild(this.div);
        this.div.setAttribute("id", heroName);
    }
    Hero.prototype.draw = function (heroName) {
        var target = document.getElementById(heroName);
        target.style.transform = "translate(" + this.x + "%," + this.y + "%)";
    };
    Hero.prototype.move = function (goal) {
        if (goal == "forest") {
            this.x = 1343;
            this.y = 115;
            this.location = "forest";
        }
        else if (goal == "town") {
            this.x = 2005;
            this.y = 115;
            this.location = "town";
        }
        else if (goal == "church") {
            this.x = 1085;
            this.y = 430;
            this.location = "church";
        }
        else if (goal == "cave") {
            this.x = 2255;
            this.y = 430;
            this.location = "cave";
        }
        else if (goal == "graveyard") {
            this.x = 1645;
            this.y = 650;
            this.location = "graveyard";
        }
    };
    Hero.prototype.goToChurch = function () {
        if (this.location == "forest") {
            this.x = 2255;
            this.y = 430;
            this.move("cave");
        }
        else if (this.location == "graveyard") {
            this.x = 2005;
            this.y = 115;
            this.move("town");
        }
        else {
            this.x = 1085;
            this.y = 430;
            this.move("church");
        }
    };
    return Hero;
}());
var Fritz = (function (_super) {
    __extends(Fritz, _super);
    function Fritz() {
        _super.call(this, "fritz");
        this.x = 2005;
        this.y = 115;
        this.location = "town";
    }
    Fritz.prototype.selectGoal = function () {
        var rando = Math.floor((Math.random() * 20) + 1);
        if (this.heldItem == true) {
            this.goToChurch();
        }
        else {
            if (this.location == "town") {
                this.move("church");
            }
            else if (this.location == "graveyard") {
                this.move("town");
            }
            else if (this.location == "forest" && rando != 13) {
                this.move("cave");
            }
            else if (this.location == "cave" && rando <= 10) {
                this.move("forest");
            }
            else if (this.location == "cave" && rando > 10) {
                this.move("church");
            }
            else if (this.location == "forest" && rando == 13) {
                this.move("graveyard");
            }
            else if (this.location == "church" && rando <= 10) {
                this.move("town");
            }
            else {
                this.move("cave");
            }
        }
    };
    return Fritz;
}(Hero));
var Game = (function () {
    function Game() {
        var _this = this;
        this.gameOver = false;
        this.days = 1;
        this.money = 400;
        this.playerTurn = true;
        this.nextMove = [false];
        new Roads();
        this.locations = new Locations();
        this.player = new Player();
        this.fritz = new Fritz();
        this.hash = new Hash();
        this.item = new Item();
        this.playerInfo = new PlayerInfo();
        document.getElementById("forest").addEventListener("click", function (e) { return _this.playerMove(e); });
        document.getElementById("town").addEventListener("click", function (e) { return _this.playerMove(e); });
        document.getElementById("church").addEventListener("click", function (e) { return _this.playerMove(e); });
        document.getElementById("cave").addEventListener("click", function (e) { return _this.playerMove(e); });
        document.getElementById("graveyard").addEventListener("click", function (e) { return _this.playerMove(e); });
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        this.player.draw();
        this.fritz.draw("fritz");
        this.hash.draw("hash");
        this.playerInfo.draw(this.days, this.money);
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.playerMove = function (e) {
        if (this.playerTurn == true) {
            this.nextMove = this.player.move(e.target.id);
        }
        if (this.nextMove[0] == true) {
            this.playerTurn = false;
            this.money -= 50;
            this.nextMove[0] = false;
            setTimeout(this.fritzMove.bind(this), 1000);
        }
    };
    Game.prototype.fritzMove = function () {
        this.fritz.selectGoal();
        setTimeout(this.hashMove.bind(this), 1000);
    };
    Game.prototype.hashMove = function () {
        var intel = null;
        if (this.item != null) {
            intel = this.item.location;
        }
        this.hash.selectGoal(intel);
        setTimeout(this.nextDay.bind(this), 2000);
    };
    Game.prototype.nextDay = function () {
        this.pickEvent();
        this.days += 1;
        this.dayReport = new DayReport(this.days, String(this.nextMove[1]), this.event, this.eventP, this.gameOver);
        if (this.item == null && this.fritz.heldItem == false && this.hash.heldItem == false) {
            this.item = new Item();
        }
        this.event = null;
        this.eventP = null;
        this.playerTurn = true;
    };
    Game.prototype.pickEvent = function () {
        if (!this.event || this.event == null) {
            this.event = this.hashDeath();
        }
        if (!this.event || this.event == null) {
            this.event = this.fritzSawCurse();
        }
        if (!this.event || this.event == null) {
            this.event = this.ending();
        }
        if (!this.eventP || this.eventP == null) {
            this.eventP = this.moneyTransfer();
        }
        if (!this.event || this.event == null) {
            this.event = this.noMoney();
        }
        if (!this.event || this.event == null) {
            this.event = this.unCurseHash();
        }
        if (!this.event || this.event == null) {
            this.event = this.unCurseFritz();
        }
        if (this.item != null) {
            if (!this.event || this.event == null) {
                this.event = this.curseItem();
            }
            if (!this.event || this.event == null) {
                this.event = this.hashGotItem();
            }
            if (!this.event || this.event == null) {
                this.event = this.fritzGotItem();
            }
        }
    };
    Game.prototype.noMoney = function () {
        if (this.money <= 0) {
            this.eventP = "";
            this.gameOver = true;
            return ("You ran out of money for travelng.</br>\xa0\xa0\xa0\xa0 GAME OVER");
        }
    };
    Game.prototype.ending = function () {
        if (this.days > 30) {
            this.gameOver = true;
            return ("You've succesfully cursed your way through the month of random treasure spawning.</br>\xa0\xa0\xa0\xa0 Thanks for playing.");
        }
    };
    Game.prototype.curseItem = function () {
        if ((this.player.location == this.item.location) && this.item.cursed == false) {
            this.item.cursed = true;
            return ("You found an item and cursed it.");
        }
    };
    Game.prototype.hashGotItem = function () {
        if ((this.hash.location == this.item.location) && this.item.cursed == true) {
            this.item = null;
            var target = document.getElementsByTagName("body");
            target[0].removeChild(document.getElementById("chest"));
            this.hash.heldItem = true;
            return ("Hash has picked up an item, but it's cursed !");
        }
        else if ((this.hash.location == this.item.location) && this.item.cursed == false) {
            this.item = null;
            var target = document.getElementsByTagName("body");
            target[0].removeChild(document.getElementById("chest"));
            return ("Hash has picked up an item.");
        }
    };
    Game.prototype.unCurseHash = function () {
        if (this.hash.location == "church" && this.hash.heldItem == true) {
            this.hash.heldItem = false;
            this.locations.churchMoney = true;
            this.locations.churchAccount += 500;
            return ("Hash entered the church.</br>O benevolent godess, please lift the curse from this man !</br>Hash payed the uncursing fee.");
        }
    };
    Game.prototype.hashDeath = function () {
        if (this.hash.location == this.player.location) {
            if (this.hash.heldItem == true) {
                return ("You ran into Hash, he is suffering from a curse.");
            }
            else {
                this.gameOver = true;
                return ("You ran into Hash, he recognized you as a witch.</br>Hash managed to kill you before you could react.</br>\xa0\xa0\xa0\xa0 GAME OVER");
            }
        }
    };
    Game.prototype.fritzGotItem = function () {
        if ((this.fritz.location == this.item.location) && this.item.cursed == true) {
            this.item = null;
            var target = document.getElementsByTagName("body");
            target[0].removeChild(document.getElementById("chest"));
            this.fritz.heldItem = true;
            return ("Fritz has picked up an item, but it's cursed !");
        }
        else if ((this.fritz.location == this.item.location) && this.item.cursed == false) {
            this.item = null;
            var target = document.getElementsByTagName("body");
            target[0].removeChild(document.getElementById("chest"));
            return ("Fritz has picked up an item.");
        }
    };
    Game.prototype.unCurseFritz = function () {
        if (this.fritz.location == "church" && this.fritz.heldItem == true) {
            this.fritz.heldItem = false;
            this.locations.churchMoney = true;
            this.locations.churchAccount += 500;
            return ("Fritz entered the church and payed the uncursing fee.</br>O benevolent godess, please lift the curse from this young man !");
        }
    };
    Game.prototype.fritzSawCurse = function () {
        if (this.fritz.location == this.player.location) {
            if (this.item.location == this.player.location) {
                this.gameOver = true;
                return ("Fritz saw you curse an item and ran away before you could silence him.</br> The church will cut their ties with you if he informs other people.</br>\xa0\xa0\xa0\xa0 GAME OVER");
            }
            else {
                return ("You ran into Hash, he recognized you as a witch.</br>Hash managed to kill you before you could react.</br>\xa0\xa0\xa0\xa0 GAME OVER");
            }
        }
    };
    Game.prototype.moneyTransfer = function () {
        if (this.player.location == "church" && this.locations.churchMoney == true) {
            this.locations.churchMoney = false;
            this.money += this.locations.churchAccount;
            var share = this.locations.churchAccount;
            this.locations.churchAccount = 0;
            return ("The church gave you " + share + " for your service.");
        }
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Hash = (function (_super) {
    __extends(Hash, _super);
    function Hash() {
        _super.call(this, "hash");
        this.x = 1645;
        this.y = 650;
        this.location = "graveyard";
    }
    Hash.prototype.selectGoal = function (treasureLocation) {
        var rando = Math.floor((Math.random() * 2) + 1);
        if (this.heldItem == true) {
            this.goToChurch();
        }
        else if (treasureLocation != null) {
            if (treasureLocation == "graveyard") {
                if (this.location == "cave") {
                    this.move("forest");
                }
                else if (this.location == "forest" || this.location == "town") {
                    this.move("graveyard");
                }
                else {
                    this.move("town");
                }
            }
            else if (treasureLocation == "forest") {
                if (this.location == "church") {
                    this.move("cave");
                }
                else if (this.location == "cave" || this.location == "graveyard") {
                    this.move("forest");
                }
                else {
                    this.move("graveyard");
                }
            }
            else if (treasureLocation == "cave") {
                if (this.location == "graveyard") {
                    this.move("forest");
                }
                else if (this.location == "church" || this.location == "forest") {
                    this.move("cave");
                }
                else {
                    this.move("church");
                }
            }
        }
        else {
            if (this.location == "graveyard") {
                this.move("town");
            }
            else if (this.location == "cave" || this.location == "town" && rando == 1) {
                this.move("church");
            }
            else if (this.location == "town") {
                this.move("graveyard");
            }
            else if (this.location == "church" && rando == 1) {
                this.move("town");
            }
            else {
                this.move("cave");
            }
        }
    };
    return Hash;
}(Hero));
var Item = (function () {
    function Item() {
        this.cursed = false;
        this.cursed = false;
        this.div = document.createElement("div");
        document.body.appendChild(this.div);
        this.div.setAttribute("id", "chest");
        this.pickSpawnPoint();
        var target = document.getElementById("chest");
        target.style.transform = "translate(" + this.x + "%," + this.y + "%)";
    }
    Item.prototype.pickSpawnPoint = function () {
        var rando = Math.floor((Math.random() * 3) + 1);
        if (rando == 1) {
            this.x = 1240;
            this.y = 350;
            this.location = "forest";
        }
        else if (rando == 2) {
            this.x = 2400;
            this.y = 1050;
            this.location = "cave";
        }
        else if (rando == 3) {
            this.x = 1645;
            this.y = 1610;
            this.location = "graveyard";
        }
    };
    return Item;
}());
var Locations = (function () {
    function Locations() {
        this.churchMoney = false;
        this.churchAccount = 0;
        this.create();
    }
    Locations.prototype.create = function () {
        for (var i = 0; i < 5; i += 1) {
            this.div = document.createElement("div");
            document.body.appendChild(this.div);
            if (i == 0) {
                this.div.setAttribute("id", "forest");
                var target = document.getElementById("forest");
                var x = 1330;
                var y = -580;
                target.style.transform = "translate(" + x + "%," + y + "%)";
            }
            else if (i == 1) {
                this.div.setAttribute("id", "town");
                var target = document.getElementById("town");
                var x = 1885;
                var y = -580;
                target.style.transform = "translate(" + x + "%," + y + "%)";
            }
            else if (i == 2) {
                this.div.setAttribute("id", "church");
                var target = document.getElementById("church");
                var x = 870;
                var y = 55;
                target.style.transform = "translate(" + x + "%," + y + "%)";
            }
            else if (i == 3) {
                this.div.setAttribute("id", "cave");
                var target = document.getElementById("cave");
                var x = 1945;
                var y = 55;
                target.style.transform = "translate(" + x + "%," + y + "%)";
            }
            else {
                this.div.setAttribute("id", "graveyard");
                var target = document.getElementById("graveyard");
                var x = 1230;
                var y = 490;
                target.style.transform = "translate(" + x + "%," + y + "%)";
            }
        }
    };
    return Locations;
}());
var Player = (function () {
    function Player() {
        this.div = document.createElement("div");
        document.body.appendChild(this.div);
        this.div.setAttribute("id", "player");
        this.x = 1085;
        this.y = 430;
        this.location = "church";
    }
    Player.prototype.draw = function () {
        var target = document.getElementById("player");
        target.style.transform = "translate(" + this.x + "%," + this.y + "%)";
    };
    Player.prototype.move = function (goal) {
        if (goal == "forest" && (this.location == "graveyard" || this.location == "cave")) {
            this.x = 1343;
            this.y = 115;
            this.location = "forest";
            return ([true, 'You have entered the forest.']);
        }
        else if (goal == "town" && (this.location == "church" || this.location == "graveyard")) {
            this.x = 2005;
            this.y = 115;
            this.location = "town";
            return ([true, 'You have entered the town of' + '\xa0\xa0' + 'Uzl.']);
        }
        else if (goal == "church" && (this.location == "town" || this.location == "cave")) {
            this.x = 1085;
            this.y = 430;
            this.location = "church";
            return ([true, 'You\'re back at the church.']);
        }
        else if (goal == "cave" && (this.location == "church" || this.location == "forest")) {
            this.x = 2255;
            this.y = 430;
            this.location = "cave";
            return ([true, 'You have entered a cave.']);
        }
        else if (goal == "graveyard" && (this.location == "forest" || this.location == "town")) {
            this.x = 1645;
            this.y = 650;
            this.location = "graveyard";
            return ([true, 'You have entered the nearby graveyard.']);
        }
        else {
            return ([false]);
        }
    };
    return Player;
}());
var PlayerInfo = (function () {
    function PlayerInfo() {
        this.div = document.createElement("div");
        this.div.setAttribute("id", "info");
        this.p = document.createElement("p");
        this.p.setAttribute("id", "infoInner");
        this.div.appendChild(this.p);
        document.body.appendChild(this.div);
    }
    PlayerInfo.prototype.draw = function (days, money) {
        var targetInner = document.getElementById("infoInner");
        targetInner.innerHTML = "Day: " + days;
        targetInner.innerHTML += "</br>Money: " + money;
    };
    return PlayerInfo;
}());
var Roads = (function () {
    function Roads() {
        this.create();
    }
    Roads.prototype.create = function () {
        for (var i = 0; i < 5; i += 1) {
            this.div = document.createElement("div");
            document.body.appendChild(this.div);
            this.div.setAttribute("id", "road" + i);
            var target = document.getElementById("road" + i);
            if (i == 0) {
                var x = 2600;
                var y = 350;
                target.style.transform = "translate(" + x + "%," + y + "%)";
                target.style.transform += "rotate(55deg)";
                target.style.transform += "scale(1,5)";
            }
            else if (i == 1) {
                var x = 3000;
                var y = 250;
                target.style.transform = "translate(" + x + "%," + y + "%)";
                target.style.transform += "rotate(-55deg)";
                target.style.transform += "scale(1,5)";
            }
            else if (i == 2) {
                var x = 2800;
                var y = 295;
                target.style.transform = "translate(" + x + "%," + y + "%)";
                target.style.transform += "rotate(90deg)";
                target.style.transform += "scale(1,5.3)";
            }
            else if (i == 3) {
                var x = 3015;
                var y = 150;
                target.style.transform = "translate(" + x + "%," + y + "%)";
                target.style.transform += "rotate(18deg)";
                target.style.transform += "scale(1,5.1)";
            }
            else {
                var x = 2535;
                var y = 50;
                target.style.transform = "translate(" + x + "%," + y + "%)";
                target.style.transform += "rotate(-15deg)";
                target.style.transform += "scale(1,5)";
            }
        }
    };
    return Roads;
}());
