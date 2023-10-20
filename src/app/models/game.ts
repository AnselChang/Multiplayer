import { GameState } from "shared/server-to-client/game-state";
import { Player } from "./player";
import { Subject } from "rxjs";

// The model for the entire game
export class Game {

    private players: Map<string, Player> = new Map<string, Player>();
    private myID: string;

    private GAME_WIDTH: number = -1;
    private GAME_HEIGHT: number = -1;

    public onMyselfPositionUpdate$ = new Subject<void>();
    
    constructor() {
        this.myID = "";
    }

    public getMyID(): string {
        return this.myID;
    }

    public getMe(): Player {
        return this.players.get(this.myID)!;
    }

    public getGameWidth(): number {
        return this.GAME_WIDTH;
    }

    public getGameHeight(): number {
        return this.GAME_HEIGHT;
    }

    public getPlayers(): Player[] {
        return Array.from(this.players.values());
    }

    public syncWithServer(state: GameState) {

        this.myID = state.myself.myId;
        this.GAME_WIDTH = state.game.GAME_WIDTH;
        this.GAME_HEIGHT = state.game.GAME_HEIGHT;

        // Update the players based on the server state
        this.players.clear();
        state.game.players.forEach((playerState) => {
            this.players.set(playerState.id, new Player(
                playerState.id,
                playerState.id === this.myID,
                playerState.name,
                playerState.fillColor,
                playerState.strokeColor,
                playerState.x,
                playerState.y,
                playerState.size,
            ));
        });

        // if myself player position is updated, notify onMyselfPositionUpdate$
        this.getMe().onPositionUpdate$.subscribe(() => {
            this.onMyselfPositionUpdate$.next();
        });
    }
    

}