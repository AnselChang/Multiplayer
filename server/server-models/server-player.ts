export class PlayerInput {
    public direction: number = 0;
    public magnitude: number = 0;

    public resetEventBasedInputs() {
    };


}

export class ServerPlayer {

    public input: PlayerInput = new PlayerInput();

    constructor(
        public id: string,
        public name: string,
        public x: number,
        public y: number,
    ) {}

}