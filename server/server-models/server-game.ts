import { GeneralGameState, PlayerState } from "../../shared/server-to-client/general-game-state";
import { ServerPlayer } from "./server-player";
import { TailoredGameState } from "../../shared/server-to-client/tailored-game-state";

// The model for the entire game
export class ServerGame {
    private players: Map<string, ServerPlayer> = new Map<string, ServerPlayer>();

    public readonly GAME_WIDTH: number = 1000;
    public readonly GAME_HEIGHT: number = 1000;
    public readonly SPAWN_COVERAGE: number = 0.8;
    
    constructor() {

    }

    public addPlayer(id: string, playerName: string) {

        // assign a random position in the map to the player (but not too close to the edge)
        let x = Math.random() * this.GAME_WIDTH * this.SPAWN_COVERAGE + this.GAME_WIDTH * (1 - this.SPAWN_COVERAGE) / 2;
        let y = Math.random() * this.GAME_HEIGHT * this.SPAWN_COVERAGE + this.GAME_HEIGHT * (1 - this.SPAWN_COVERAGE) / 2;

        this.players.set(id, new ServerPlayer(id, playerName, x, y));
    }

    public removePlayer(id: string) {
        this.players.delete(id);
    }

    public generateGeneralGameState(): GeneralGameState {
        let playerStates: Map<string, PlayerState> = new Map<string, PlayerState>();
        this.players.forEach((player, id) => {
            playerStates.set(id, new PlayerState(id, player.name, player.x, player.y));
        });

        const playersArray = Array.from(playerStates.values());
        return new GeneralGameState(this.GAME_WIDTH, this.GAME_HEIGHT, playersArray);
    }

    public generateTailoredGameState(id: string): TailoredGameState {
        return new TailoredGameState(id);
    }

    public getPlayerIDs(): string[] {
        return Array.from(this.players.keys());
    }

    public getPlayerByID(id: string): ServerPlayer {
        return this.players.get(id)!;
    }

    // called every tick. update the game state
    public update() {

        // For every player, move them according to their input direction
        this.players.forEach((player) => {

            // game logic: max movement speed is 5. if less than 1, set to 0
            let speed = player.input.magnitude;
            if (speed < 1) {
                speed = 0;
            } else if (speed > 5) {
                speed = 5;
            }

            player.x += speed * Math.cos(player.input.direction);
            player.y += speed * Math.sin(player.input.direction);

            // bound the player to the map
            player.x = Math.max(0, Math.min(this.GAME_WIDTH, player.x));
            player.y = Math.max(0, Math.min(this.GAME_HEIGHT, player.y));
            

        });


        // reset event-based inputs for all players
        this.players.forEach((player) => {
            player.input.resetEventBasedInputs();
        });

    }

}