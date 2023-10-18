import { GameState } from "shared/server-to-client/game-state";
import { Player } from "./player";

// The model for the entire game
export class Game {
    private players: Map<number, Player> = new Map<number, Player>();
    private myId: number;
    
    constructor() {
        this.myId = -1;
    }

    public syncWithServer(state: GameState) {

        this.myId = state.myself.myId;

        // Update the players based on the server state
        this.players.clear();
        state.game.players.forEach((playerState, id) => {
            this.players.set(id, new Player(
                playerState.id,
                playerState.id === this.myId,
                playerState.name,
                playerState.x,
                playerState.y,
            ));
        });
    }
    

}