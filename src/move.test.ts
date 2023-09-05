import { ChessRules } from "./ChessRules";
import { pieceMovesWithCheck } from "./move";


export function testMove(rules : ChessRules,fen : string,from : string,rightMoves : string,wrongMoves : string){ 
    rules.setfen(fen);
    let pos = rules.state.positions.find(p => p.notation === from);

    let moves = pieceMovesWithCheck(rules.state,pos);

    moves.forEach(position => {
        if(wrongMoves.includes(" "+position.notation+" ")){
            console.log(from + " -> " + position.notation + " should not be a valid move!");
        }
    })

    if(rightMoves.length === 0){
        return;
    }

    rightMoves.split(" ").forEach(pos => {
        if(!moves.find(m => m.notation === pos)){
            console.log(from + " -> " + pos + " should be a valid move!");
        }
    })
}