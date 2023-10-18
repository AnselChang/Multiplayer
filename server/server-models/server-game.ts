import { GeneralGameState, PlayerState } from "shared/server-to-client/general-game-state";
import { ServerPlayer } from "./server-player";
import { TailoredGameState } from "shared/server-to-client/tailored-game-state";

// The model for the entire game
export class ServerGame {
    private players: Map<number, ServerPlayer> = new Map<number, ServerPlayer>();
    private idCount: number = 0;

    public readonly GAME_WIDTH: number = 1000;
    public readonly GAME_HEIGHT: number = 1000;
    public readonly SPAWN_COVERAGE: number = 0.8;
    
    constructor() {

    }

    public addPlayer(playerName: string) {
        let id = this.idCount++;

        // assign a random position in the map to the player (but not too close to the edge)
        let x = Math.random() * this.GAME_WIDTH * this.SPAWN_COVERAGE + this.GAME_WIDTH * (1 - this.SPAWN_COVERAGE) / 2;
        let y = Math.random() * this.GAME_HEIGHT * this.SPAWN_COVERAGE + this.GAME_HEIGHT * (1 - this.SPAWN_COVERAGE) / 2;

        this.players.set(id, new ServerPlayer(id, playerName, x, y));
    }

    public removePlayer(id: number) {
        this.players.delete(id);
    }

    public generateGeneralGameState(): GeneralGameState {
        let playerStates: Map<number, PlayerState> = new Map<number, PlayerState>();
        this.players.forEach((player, id) => {
            playerStates.set(id, new PlayerState(id, player.name, player.x, player.y));
        });
        return new GeneralGameState(this.GAME_WIDTH, this.GAME_HEIGHT, playerStates);
    }

    public generateTailoredGameState(id: number): TailoredGameState {
        return new TailoredGameState(id);
    }

    public getPlayerIDs(): number[] {
        return Array.from(this.players.keys());
    }

}