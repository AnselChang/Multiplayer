import { GeneralGameState } from "./general-game-state";
import { TailoredGameState } from "./tailored-game-state";

// The aggregate game state that will be sent from the server to each client

export class GameState {
    constructor (public game: GeneralGameState, public myself: TailoredGameState) {}
}