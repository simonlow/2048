/*
Add your code for Game here
 */
export default class Game {
    constructor (size) {
        this.size = size; 
        this.fullsize = this.size*this.size; 
        this.arr = new Array(this.fullsize);
        this.arr.fill(0);
        this.moveArray = [];
        this.winArray = [];
        this.loseArray = [];
        this.gameState = {
            board: this.arr,
            score: 0,
            won: false,
            over: false
        }
        
        this.addValue();
        this.addValue();
    }
    
    addValue() {
       
        let value = this.newValue();
        let index = Math.floor(Math.random()*this.fullsize);
       
        while(this.gameState.board[index] != 0) {
            index = Math.floor(Math.random()*this.fullsize);
            
        }
        this.gameState.board[index] = value; 
        
    }
    //method to get 2 90% of the time, 4 10% of the time
    newValue() {
        let value = Math.floor(Math.random()*10);
        if (value <1) {
            return 4;
        }
        else {
            return 2;
        }
    }

    loadGame(gameState) {
        this.gameState = gameState;
    }

    setupNewGame() { 
        this.gameState.board= new Array(this.size*this.size).fill(0);
        this.gameState.score= 0;
        this.gameState.won= false;
        this.gameState.over= false;
        
        this.addValue();
        this.addValue();
    }

    move(direction) {
        if(this.gameState.won || this.gameState.over) {
            return; 
        }
        //this.onMove();
        //move right
        if(direction == "right") {
            for(let i = 0; i < this.size; i++) {
                let row = new Array(this.size).fill(0);
                let index = 0; 
                //trash zeroes round 1
                for(let j = (this.size*i)+this.size-1; j>=this.size*i; j--) {
                    if(this.gameState.board[j] != 0) {
                        row[index] = this.gameState.board[j];
                        index++;
                    }
                }
                //merge tiles
                for (let x = 0; x<this.size-1; x++) {
                    if (row[x] === row[x+1]) {
                        row[x]= 2*row[x];
                        this.gameState.score += row[x];
                        row[x+1] = 0;
                        x++;
                    }
                }
                //trash zeroes again
                let final_row = new Array(this.size).fill(0);
                let spot = 0;
                for(let x = 0; x < this.size; x++) {
                    if (row[x] != 0) {
                        final_row[spot] = row[x];
                        spot++;
                    }
                }
                for(let l = 0; l<this.size;l++) {
                    this.gameState.board[(this.size*i)+this.size-1-l] = final_row[l];
                }  
            }
        }
        //move left
        if(direction == "left") {
            for(let i = 0; i < this.size; i++) {
                let row = new Array(this.size).fill(0);
                let index = 0; 
                //trash zeroes round 1
                for(let j = i*this.size; j<(i+1)*this.size; j++) {
                    if(this.gameState.board[j] != 0) {
                        row[index] = this.gameState.board[j];
                        index++;
                    }
                }
                //merge tiles
                for (let x = 0; x<this.size-1; x++) {
                    if (row[x]==row[x+1]) {
                        row[x]= 2*row[x];
                        this.gameState.score += row[x];
                        row[x+1] = 0;
                        x++;
                    }
                }
                //trash zeroes again
                let final_row = new Array(this.size).fill(0);
                let spot = 0;
                for(let x = 0; x < this.size; x++) {
                    if (row[x] != 0) {
                        final_row[spot] = row[x];
                        spot++;
                    }
                }
                for(let l = 0; l<this.size;l++) {
                    this.gameState.board[l+(i*this.size)] = final_row[l];
                }
            }
        }

        //move up
        if (direction == "up") {   
            for(let i = 0; i < this.size; i++) {
                let column = new Array(this.size).fill(0);
                let index = 0; 
                //trash zeroes round 1
                for (let j = i; j <= (this.size*(this.size-1))+i; j+=this.size) {
                    if(this.gameState.board[j] != 0) {
                        column[index] = this.gameState.board[j];
                        index++;
                    }
                }
                //merge tiles
                for (let x = 0; x<this.size-1; x++) {
                    if (column[x]==column[x+1]) {
                        column[x]= 2*column[x];
                        this.gameState.score += column[x];
                        column[x+1] = 0;
                        x++;
                    }
                }
                //trash zeroes again
                let final_column = new Array(this.size).fill(0);
                let spot = 0;
                for(let x = 0; x < this.size; x++) {
                    if (column[x] != 0) {
                        final_column[spot] = column[x];
                        spot++;
                    }
                }
                //put values back into gameState.board
                for(let l = 0; l<this.size; l++) {
                   this.gameState.board[(this.size*l)+i] = final_column[l];
                }
            }
        }

        //move down
        if (direction == "down") {
            for(let i = 0; i < this.size; i++) {
                let column = new Array(this.size).fill(0);
                let index = 0; 
                //trash zeroes round 1
                for(let j = (this.size*(this.size-1))+i; j >=i; j-=this.size) {
                    if (this.gameState.board[j] != 0) {
                        column[index] = this.gameState.board[j];
                        index++;
                    }
                }
                //merge tiles
                for (let x = 0; x<this.size-1; x++) {
                    if (column[x]==column[x+1]) {
                        column[x]= 2*column[x];
                        this.gameState.score += column[x];
                        column[x+1] = 0;
                        x++;
                    }
                }
                //trash zeroes again
                let final_column = new Array(this.size).fill(0);
                let spot = 0;
                for(let x = 0; x < this.size; x++) {
                    if (column[x] != 0) {
                        final_column[spot] = column[x];
                        spot++;
                    }
                }
                //back into this.gameState.board 
                for (let l = 0; l < this.size; l++) {
                    this.gameState.board[this.size*(this.size-1)-(l*this.size)+i] = final_column[l];
                }
            }
        }
        this.moveArray.forEach(elem => {elem(this.getGameState())});
        //checks for fullness at beginning of method, so we should be able to add a value
        if (this.isFull()==false) {
            this.addValue();
        }
        for(let i = 0; i < this.fullsize; i++) {
            if(this.gameState.board[i] == 2048) {
                this.gameState.won = true; 
                this.winArray.forEach(elem => {elem(this.getGameState())});
                
                break;
            }
        }

        //check for possible moves
        if(this.isFull()) {
            let movePossible = false; 
            for(let i = 0; i<this.size;i++) {
                //check ith row
                for(let j = i*this.size; j< (this.size*i)+this.size-1; j++) {
                    if(this.gameState.board[j] == this.gameState.board[j+1]) {
                        movePossible = true;
                        break; 
                    }
                }
                //check ith column
                for(let j = i; j<this.size*(this.size-1)+i;j+=this.size) {
                    if(this.gameState.board[j] == this.gameState.board[j+this.size]) {
                        movePossible = true;
                        return; 
                    }
                }
            }
            if(movePossible==false) {
                this.gameState.over = true;
                this.loseArray.forEach(elem => {elem(this.getGameState())});
            }
        }
    }
    isFull() {
        for(let i = 0; i < this.fullsize; i++) {
            if (this.gameState.board[i] == 0) {
                return false; 
            }
        }
        return true; 
    }
    toString() {
        let str = '';
        let ascii = new Array(this.fullsize);
        for (let i = 0; i < this.fullsize; i++) {
            if(this.gameState.board[i] == 0) {
                ascii[i] = '[ ]';
                str.concat(ascii[i]);
            }
            else {
                ascii[i] = '[' + this.gameState.board[i] + '] ';
                str.concat(ascii[i]);
            }
            if ((i+1)%4 === 0) {
                str.concat('\n');
            }
        }
        return str; 
    }

    onMove(callback) {
        this.moveArray[this.moveArray.length] = callback;
    }

    onWin(callback) {
        this.winArray[this.winArray.length] = callback;
        
    }

    onLose(callback) {
        this.loseArray[this.loseArray.length] = callback; 
    }

    getGameState(){
        return this.gameState;
    }
}
