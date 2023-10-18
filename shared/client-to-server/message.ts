export enum MessageType {
    JOIN_GAME = "JOIN_GAME",
    PLAYER_INPUT = "PLAYER_INPUT",
}
    
export abstract class Message {
    constructor(public type: MessageType) {}
}

export class JoinGameMessage extends Message {
    constructor(public name: string) {
        super(MessageType.JOIN_GAME);
    }
}

export class PlayerInputMessage extends Message {
    constructor(public mx: number, public my: number) {
        super(MessageType.PLAYER_INPUT);
    }
}