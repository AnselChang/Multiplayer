// all the game state that will be sent from the server to ALL of the clients without any differentiation

export interface PlayerState {
    id: number;
    name: string;
    x: number;
    y: number;
}

export class GeneralGameState {

    constructor(public players: Map<number, PlayerState>) {}
}