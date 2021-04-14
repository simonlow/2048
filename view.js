import Game from "./game.js"

export const newGame = function (game) {
    const $root = $('#root');
    
    let scoreKeeper = `<div class = "score">Score: ${game.gameState.score}</div>`;
    let reset = `<button type = "button" class = "reset">Reset</button>`;
    let state = `<h2></h2>`;
    let container = `<div class = "grid-container">`;
    for(let i = 0; i <game.size; i++) {
        let row = [];
        let index = 0;
        for(let j = game.size*i; j<(game.size*i)+game.size;j++) {
            container+=`<div class = "grid-item">${game.gameState.board[j]}</div>`
        }
    }
    if(game.gameState.over == true) {
        state = `<div class = "loss">Game Over, you lost!</div>`;
    }
    if(game.gameState.won == true) {
        state = `<div class = "win">You won 2048!</div>`
    }

    $root.html(game);
    $root.append(container);
    $root.append(state);
    $root.append(reset);
    $root.append(scoreKeeper);

}

$(function() {
    let game = new Game(4);
    newGame(game);
    
    //look for key presses to initiate any action
    $(document).on('keydown', function(k) {
        k.preventDefault();
        if(k.keyCode == '37') {
            game.move('left');
        }
        if(k.keyCode == '38') {
            game.move('up');
        }
        if(k.keyCode == '39') {
            game.move('right');     
        }
        if(k.keyCode == '40') {
            game.move('down');
        }
        
        const $root = $('#root');
        let state = `<h2></h2>`;
        let scoreKeeper = `<div class = "score">Score: ${game.gameState.score}</div>`;
        let reset = `<button type = "button" class = "reset">Reset</button>`;
        let container = `<div class = "grid-container">`;
        for(let i = 0; i <game.size; i++) {
            let row = [];
            let index = 0;
            for(let j = game.size*i; j<(game.size*i)+game.size;j++) {
                container+=`<div class = "grid-item">${game.gameState.board[j]}</div>`
            }
        }

        if(game.gameState.won == true) {
            state = `<h2 class = 'won game'>You beat 2048!</h2>`;
        }
        if(game.gameState.over == true) {
            state = `<h2 class = 'game over'>You just lost 2048 </h2>`;
        }

        $(document).on('click', ".reset", function() {
            game.setupNewGame();
    
            const $root = $('#root');
            let state = ``;
            let scoreKeeper = `<div class = "score">Score: ${game.gameState.score}</div>`;
            let reset = `<button type = "button" class = "reset">Reset</button>`;
    
            let container = `<div class = "grid-container">`;
            for(let i = 0; i <game.size; i++) {
                let row = [];
                let index = 0;
                for(let j = game.size*i; j<(game.size*i)+game.size;j++) {
                    container+=`<div class = "grid-item">${game.gameState.board[j]}</div>`
                }
            }
    
            if(game.gameState.won == true) {
                state = `<h2 class = 'won game'>You beat 2048!</h2>`;
            }
            if(game.gameState.over == true) {
                state = `<h2 class = 'game over'>You just lost 2048 </h2>`;
            }
            
    
            $root.html(game);
            $root.append(container);
            $root.append(state);
            $root.append(reset);
            $root.append(scoreKeeper);
        });
        
        $root.html(game);
        $root.append(container);
        $root.append(state);
        $root.append(reset);
        $root.append(scoreKeeper);
    }); 
    
});

