import { State } from "./State.js";
import { isCheck } from "./move.js";

export enum Piece {
    P = "p",
    R = "r",
    B = "b",
    N = "n",
    K = "k",
    Q = "q",
}

export interface Position {
    piece : Piece,
    color : Color,
    readonly notation : string,
    readonly raw : {
        readonly row : number,
        readonly col : number,
    }
}

export enum Color {
    WHITE = "w",
    BLACK = "b"
}

export function getNotation(row : number,col : number){
    let notation = "";
    switch(col){
        case 1 : notation += 'a';break;
        case 2 : notation += 'b';break;
        case 3 : notation += 'c';break;
        case 4 : notation += 'd';break;
        case 5 : notation += 'e';break;
        case 6 : notation += 'f';break;
        case 7 : notation += 'g';break;
        case 8 : notation += 'h';break;
    }
    notation += 9-row;
    return notation;
}

export function getPiece(str : string) : Piece {
    switch(str.toLowerCase()){
        case 'p' : return Piece.P;
        case 'r' : return Piece.R;
        case 'b' : return Piece.B;
        case 'n' : return Piece.N;
        case 'k' : return Piece.K;
        case 'q' : return Piece.Q;
        default : return null;
    }
}

export function getMoveNotation(from : Position,to : Position,state : State) : string {
    let not = "";
    let canMoveThere = new Array<Position>();
    state.validMoves.forEach((v,k) => {
        for(let i in v){
            if(v[i].notation === to.notation && k.notation !== from.notation){
                canMoveThere.push(k);
                break;
            }
        }
    })

    if(from.piece === Piece.P){
        if(to.piece) {
            not += from.notation.charAt(0);
            not += "x";
        }
    }else {
        if(canMoveThere.length === 0) {
            not += from.color === Color.WHITE ? from.piece.toLocaleUpperCase() : from.piece.toLocaleLowerCase();
        }else {
            // maybe wont work in some situations
            if(canMoveThere[0].notation.charAt(0) === from.notation.charAt(0)){
                not += from.notation.charAt(1);
            }else {
                not += from.notation.charAt(0);
            }
        }
    
        if(to.piece) {
            not += "x";
        }    
    }

    not += to.notation;

    if(isCheck(from,to,state,from.color === Color.WHITE ? Color.BLACK : Color.WHITE)){
        // TODO : check mate
        not += "+";
    }

    return not;
}