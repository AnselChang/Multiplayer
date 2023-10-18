import { GameState } from "shared/server-to-client/game-state";
import { Player } from "./player";

// The model for the entire game
export class Game {
    private players: Map<number, Player> = new Map<number, Player>();
    private myID: number;
    
    constructor() {
        this.myID = -1;
    }

    public getMyID(): number {
        return this.myID;
    }

    public syncWithServer(state: GameState) {

        this.myID = state.myself.myId;

        // Update the players based on the server state
        this.players.clear();
        state.game.players.forEach((playerState) => {
            this.players.set(playerState.id, new Player(
                playerState.id,
                playerState.id === this.myID,
                playerState.name,
                playerState.x,
                playerState.y,
            ));
        });
    }
    

}