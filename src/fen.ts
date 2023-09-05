import { State } from "./State";
import { Color, Position, getNotation, getPiece } from "./Utils";

function parsePieces(str : string,state : State) {
    state.positions = new Array<Position>;
    for(let i=1;i<=8;i++){
        for(let j=1;j<=8;j++){
            state.positions.push({
                piece : null,
                color : null,
                notation : getNotation(i,j),
                raw : {
                    row : i,
                    col : j,
                }
            });
        }
    }

    let rows = str.split("/");
    let col = 1;
    rows.forEach((rowStr,row) => {
        col = 1;
        for(let i = 0;i<rowStr.length;i++){
            if(col > 8) {
                break;
            }
            let c = rowStr.charAt(i);
            if(!Number.isNaN(Number(c))){ // if c is a number
                let num = parseInt(c);
                col += num;
            }else {
                let pos = state.positions.find(p => p.raw.col === col && p.raw.row === row+1);
                if(c == c.toLocaleLowerCase()){
                    pos.color = Color.BLACK;
                }else {
                    pos.color = Color.WHITE;
                }
                pos.piece = getPiece(c);
                col++;
            }
        }
    })
}

function parseCastling(str : string,state : State) {
    state.castling = {
        whiteKingSide: false,
        whiteQueenSide: false,
        blackKingSide: false,
        blackQueenSide: false,
    };

    str.split("").forEach(c => {
        if(c == 'K'){
            state.castling.whiteKingSide = true;
        }
        if(c == 'Q'){
            state.castling.whiteQueenSide = true;
        }
        if(c == 'k'){
            state.castling.blackKingSide = true;
        }
        if(c == 'q'){
            state.castling.blackQueenSide = true;
        }
    })
}

export function parseFen(state : State,fen : string) {
    state.fen = fen;
    let parts = fen.split(" ");
    parsePieces(parts[0],state);
    if(parts[1] === "w"){
        state.onMove = Color.WHITE;
    }else {
        state.onMove = Color.BLACK;
    }
    parseCastling(parts[2],state);
    state.halfMoves = parseInt(parts[4]);
    state.movesCount = parseInt(parts[5]);
    state.enPassant = parts[3];
}




export function stringifyFen(state : State) : string {
    let fen = "";

    let col = 0;
    state.positions.forEach((p,i) => {
        
        if(i%8 === 0 && i != 0){
            if(col !== 0){
                fen += col;
            }
            fen += "/";
            col = 0;
        }

        if(p.piece) {
            if(col !== 0){
                fen += col;
            }
            if(p.color === Color.WHITE){
                fen += p.piece.toUpperCase();
            }else {
                fen += p.piece;
            }
            col = 0;
        }else {
            col++;
       }
    })

    if(col != 0){
        fen += col;
    }

    fen += " ";
    fen += state.onMove;
    fen += " ";

    if(state.castling.whiteKingSide) {
        fen += "K"
    }
    if(state.castling.whiteQueenSide) {
        fen += "Q"
    }
    if(state.castling.blackKingSide) {
        fen += "k"
    }
    if(state.castling.blackQueenSide) {
        fen += "q"
    }

    if(fen.charAt(fen.length-1) === " ") {
        fen += "-";
    }
    fen += " ";

    fen += state.enPassant;
    fen += " ";

    fen += state.halfMoves;
    fen += " ";
    fen += state.movesCount;

    return fen;
}