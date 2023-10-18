// all the game state that will be sent from the server to ALL of the clients without any differentiation

export class PlayerState {
    constructor(
        public id: number,
        public name: string,
        public x: number,
        public y: number
    ) {}
}

export class GeneralGameState {

    constructor(
        public GAME_WIDTH: number,
        public GAME_HEIGHT: number,
        public players: PlayerState[]) {}
}