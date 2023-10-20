import { Color, Piece, Position } from "./Utils.js";

export interface State {
    fen : string,
    positions : Array<Position>,
    onMove : Color,
    castling : {
        whiteKingSide: boolean;
        whiteQueenSide: boolean;
        blackKingSide: boolean;
        blackQueenSide: boolean;
    },
    enPassant : string,
    halfMoves : number,
    movesCount : number,

    validMoves : Map<Position,Array<Position>>;

    nextPromotion : Piece;
}