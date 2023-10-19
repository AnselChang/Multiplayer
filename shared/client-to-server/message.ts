export enum MessageType {
    JOIN_GAME = "JOIN_GAME",
    DIRECTIONAL_PLAYER_INPUT = "DIRECTIONAL_PLAYER_INPUT",
}
    
export abstract class Message {
    constructor(public type: MessageType) {}
}

export class DirectionalPlayerInputMessage extends Message {
    constructor(public direction: number, public magnitude: number) {
        super(MessageType.DIRECTIONAL_PLAYER_INPUT);
    }
}