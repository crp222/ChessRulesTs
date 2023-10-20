import { State } from "./State.js";
import { Color, Piece, Position, getNotation, getPiece } from "./Utils.js";
import { parseFen } from "./fen.js";


function rook(from: Position, state: State, moves: Array<Position>) {
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row - i && pos.raw.col === from.raw.col);
         if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if(p.color === from.color){
            break;
        }
        if(p.color === from.color){
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row + i && pos.raw.col === from.raw.col);
         if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if(p.color === from.color){
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row && pos.raw.col === from.raw.col - i);
         if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if(p.color === from.color){
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row && pos.raw.col === from.raw.col + i);
         if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if(p.color === from.color){
            break;
        }
    }
}

function bishop(from: Position, state: State, moves: Array<Position>) {
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row - i && pos.raw.col === from.raw.col - i);
         if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if(p.color === from.color){
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row + i && pos.raw.col === from.raw.col + i);
         if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if(p.color === from.color){
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row - i && pos.raw.col === from.raw.col + i);
         if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if(p.color === from.color){
            break;
        }
    }
    for (let i = 1; i <= 8; i++) {
        let p = state.positions.find(pos => pos.raw.row === from.raw.row + i && pos.raw.col === from.raw.col - i);
         if (!p) {
            break;
        }
        if (!p.piece) {
            moves.push(p);
            continue;
        }
        if (p.color !== from.color) {
            moves.push(p);
            break;
        }
        if(p.color === from.color){
            break;
        }
    }
}

function knight(from : Position,state : State,moves : Array<Position>) {
    
    let pos = state.positions.find(p => p.raw.row === from.raw.row + 2 && p.raw.col === from.raw.col + 1);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row + 2 && p.raw.col === from.raw.col - 1);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row - 2 && p.raw.col === from.raw.col + 1);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row - 2 && p.raw.col === from.raw.col - 1);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row + 1 && p.raw.col === from.raw.col - 2);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row - 1 && p.raw.col === from.raw.col - 2);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row + 1 && p.raw.col === from.raw.col + 2);
    moves.push(pos);
    pos = state.positions.find(p => p.raw.row === from.raw.row - 1 && p.raw.col === from.raw.col + 2);
    moves.push(pos);
}

function queen(from : Position,state : State,moves : Array<Position>) {
    bishop(from,state,moves);
    rook(from,state,moves);
}

function pawn(from : Position,state : State,moves : Array<Position>){
    let dir = -1;
    if(from.color === Color.BLACK){
        dir = 1;
    }
    let startrow = from.color === Color.WHITE ? 7 : 2;

    let pos = state.positions.find(p => p.raw.row === from.raw.row + dir && p.raw.col === from.raw.col);
    if(!pos.piece){
        moves.push(pos);
    }
    if(from.raw.row === startrow && !pos.piece){
        pos = state.positions.find(p => p.raw.row === from.raw.row + dir*2 && p.raw.col === from.raw.col);
        if(!pos.piece){
            moves.push(pos);
        }
    }
    let take1 = state.positions.find(p => p.raw.row === from.raw.row + dir && p.raw.col === from.raw.col + 1);
    if(take1 && take1.piece && take1.color !== from.color){
        moves.push(take1);
    }
    let take2 = state.positions.find(p => p.raw.row === from.raw.row + dir && p.raw.col === from.raw.col - 1);
    if(take2 && take2.piece && take2.color !== from.color){
        moves.push(take2);
    }

    if(state.enPassant !== "-"){
        if(take1 && take1.notation === state.enPassant){
            moves.push(take1)
        }
        if(take2 && take2.notation === state.enPassant){
            moves.push(take2)
        }
    }
}

function king(from : Position,state : State,moves : Array<Position>){
    let pos;
    for(let i=1;i<=8;i++){
        for(let j=1;j<=8;j++){
            if(Math.abs(from.raw.row-i) <= 1 && Math.abs(from.raw.col-j) <= 1){
                pos = state.positions.find(p => p.raw.row === i && p.raw.col === j);
                moves.push(pos);  
            }
        }
    }

    if(state.castling.whiteKingSide && from.color === Color.WHITE) {
        pos = state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === from.raw.col+2);
        moves.push(pos);
    }
    if(state.castling.whiteQueenSide && from.color === Color.WHITE) {
        pos = state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === from.raw.col-2);
        moves.push(pos);
    }
    if(state.castling.blackKingSide && from.color === Color.BLACK) {
        pos = state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === from.raw.col+2);
        moves.push(pos);
    }
    if(state.castling.blackQueenSide && from.color === Color.BLACK) {
        pos = state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === from.raw.col-2);
        moves.push(pos);
    }
}

export function pieceMoves(state: State, from: Position): Array<Position> {
    let moves = new Array<Position>();

    if(state.onMove !== from.color){
        return moves;
    }

    switch (from.piece) {
        case Piece.B: bishop(from, state, moves); break;
        case Piece.R: rook(from, state, moves); break;
        case Piece.N: knight(from,state,moves); break;
        case Piece.Q: queen(from,state,moves);break;
        case Piece.P: pawn(from,state,moves);break;
        case Piece.K: king(from,state,moves);break;
    }

    moves = moves.filter(move => move || false);
    moves = moves.filter(move => move.color !== from.color);

    return moves;
}




export function isCheck(from : Position,to : Position,state : State,color : Color): boolean {

    let fromPiece = from.piece;
    let toPiece = to.piece;
    let fromColor = from.color;
    let toColor = to.color;
    let onMove = state.onMove;

    let check = false;
    let moves;
    let pos;
    let king = state.positions.find(p => p.piece && p.piece === Piece.K && p.color === color);

    // simulate move
    to.piece = from.piece;
    to.color = from.color;
    from.piece = null;
    from.color = null;
    state.onMove = color === Color.WHITE ? Color.BLACK : Color.WHITE;

    // check if the other player pieces can take the king 
    for(let i in state.positions){
        pos = state.positions[i];
        if(pos.piece && pos.color !== color){
            moves = pieceMoves(state,pos);
            king = state.positions.find(p => p.piece && p.piece === Piece.K && p.color === color);
            if(king &&  moves.find(m => m.notation === king.notation)){
                check = true;
                break;
            }
        }
    }

    // reset everything
    from.piece = fromPiece;
    to.piece = toPiece;
    from.color = fromColor;
    to.color = toColor;
    state.onMove = onMove;

    return check;
}

export function pieceMovesWithCheck(state: State, piece: Position): Array<Position> {
    let moves = new Array<Position>();
    moves = pieceMoves(state,piece);
    moves = moves.filter(move => isCheck(piece,move,state,piece.color) === false);
    return moves;
}



export function getAllValidMoves(state : State){
    state.validMoves = new Map();
    state.positions.forEach(p => {
        if(p.piece){
            state.validMoves.set(p,pieceMovesWithCheck(state,p));
        }
    })
}