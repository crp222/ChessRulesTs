export abstract class Judge {

    fen : string;

    abstract setfen(fen : string) : void;

    abstract allValidMoves() : string;

    abstract isValid(move : string) : boolean;

    abstract validMoves(piece : string) : string;

    abstract moveToNotation(move : string) : string;

    abstract fenAfterMove(move : string) : string;
}