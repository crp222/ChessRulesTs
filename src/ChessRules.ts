
import { Judge } from "./JudgeUtils.js"
import { State } from "./State.js";
import { Color, Piece, getMoveNotation, getNotation } from "./Utils.js";
import { parseFen, stringifyFen } from "./fen.js";
import { getAllValidMoves, pieceMoves, pieceMovesWithCheck } from "./move.js";

export class ChessRules extends Judge {

    state: State;

    constructor() {
        super();
        this.state = {
            fen: "",
            positions: [],
            onMove: null,
            castling: null,
            enPassant: null,
            movesCount : 0,
            halfMoves : 0,
            validMoves : new Map(),
            nextPromotion : Piece.Q,
        }
    }

    setfen(fen: string): void {
        this.fen = fen;
        parseFen(this.state, fen);
        getAllValidMoves(this.state);
        this.state.nextPromotion = Piece.Q;
    }
    
    getfen(): string {
        return stringifyFen(this.state);
    }

    allValidMoves(): string {
        let str = "";
        for(let i in this.state.positions){
            let pos = this.state.positions[i];
            if(pos.piece){
                let moves = pieceMoves(this.state,pos);
                moves.forEach(move => {
                    str += getMoveNotation(pos,move,this.state);
                })
            }
        }
        return str;
    }
    
    isValid(move: string): boolean {
        let notation = this.moveToNotation(move);
        let moves = this.validMoves(move.split(" ")[0]);
        if(moves.includes(notation)){
            return true;
        }
        return false;
    }

    validMoves(piece: string): string {
        let piecePos = this.state.positions.find(p => p.notation === piece);
        let moves = this.state.validMoves.get(piecePos);
        let movesstr = " ";
        moves.forEach(m => {
            movesstr += getMoveNotation(piecePos, m, this.state);
            movesstr += " ";
        })
        movesstr = movesstr.trim();
        return movesstr;
    }

    moveToNotation(move: string): string {
        let parts = move.split(" ");
        let from = this.state.positions.find(p => p.notation === parts[0]);
        let to = this.state.positions.find(p => p.notation === parts[1]);
        return getMoveNotation(from,to,this.state);
    }

    fenAfterMove(move: string): string {
        let parts = move.split(" ");
        let from = this.state.positions.find(p => p.notation === parts[0]);
        let to = this.state.positions.find(p => p.notation === parts[1]);
        let prevState = JSON.stringify(this.state);
        if(from.color === Color.BLACK) {
            this.state.movesCount++;
        }
        this.state.halfMoves++;
        if(from.piece === Piece.P){
            this.state.halfMoves = 0;

            // detect enpassant
            this.state.enPassant = "-";
            if((from.raw.row === 2 || from.raw.row === 7) && (Math.abs(to.raw.row - from.raw.row) === 2)){
                let enpassant1 = this.state.positions.find(p => p.raw.row === to.raw.row && p.raw.col === to.raw.col-1);
                let enpassant2 = this.state.positions.find(p => p.raw.row === to.raw.row && p.raw.col === to.raw.col+1);
                if(enpassant1.piece === Piece.P){
                    this.state.enPassant = getNotation(from.raw.row === 2 ? to.raw.row-1 : to.raw.row+1,to.raw.col);
                }
                if(enpassant2.piece === Piece.P){
                    this.state.enPassant = getNotation(from.raw.row === 2 ? to.raw.row-1 : to.raw.row+1,to.raw.col);
                }
            }
        }
        if(from.piece === Piece.K){
            if(from.color === Color.WHITE){
                this.state.castling.whiteKingSide = false;
                this.state.castling.whiteQueenSide = false;
            }else {
                this.state.castling.blackKingSide = false;
                this.state.castling.blackQueenSide = false;
            }
        }
        if(from.piece === Piece.R){
            if(from.color === Color.WHITE){
                if(from.raw.col === 1) {
                    this.state.castling.whiteQueenSide = false;
                }
                if(from.raw.col === 8) {
                    this.state.castling.whiteKingSide = false;
                }
            }else {
                if(from.raw.col === 1) {
                    this.state.castling.blackQueenSide = false;
                }
                if(from.raw.col === 8) {
                    this.state.castling.blackKingSide = false;
                }
            }
        }

         // enpassant move
        if(from.piece === Piece.P && from.raw.col !== to.raw.col){
            let passanted = this.state.positions.find(
                p => p.raw.row === to.raw.row+(from.color === Color.WHITE ? 1 : -1) && p.raw.col === to.raw.col);
            passanted.color = null;
            passanted.piece = null;
        }

        // execute move 
        if(from.piece === Piece.K && Math.abs(from.raw.col - to.raw.col) > 1){
            // CASTLE
            to.piece = from.piece;
            to.color = from.color;
            let rook = this.state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === to.raw.col+1);
            let rookNewPos = this.state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === from.raw.col+1);
            if(!rook || !rook.piece){ 
                rook = this.state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === to.raw.col-2);
                rookNewPos = this.state.positions.find(p => p.raw.row === from.raw.row && p.raw.col === from.raw.col-1);
            }
            from.piece = null;
            from.color = null;
            rookNewPos.piece = rook.piece;
            rookNewPos.color = rook.color;
            rook.piece = null;
            rook.color = null;
        }else {
            to.piece = from.piece;
            to.color = from.color;
            from.piece = null;
            from.color = null;
        }

        // promotion
        if(to.piece === Piece.P && (to.raw.row === 1 || to.raw.row === 8)) {
             to.piece = this.state.nextPromotion;
        }

        this.state.onMove = this.state.onMove === Color.WHITE ? Color.BLACK : Color.WHITE;

        let str = stringifyFen(this.state);
        this.state = JSON.parse(prevState);
        return str;
    }
}