// the game state that will be sent from the server to one specific client.
// state that is ONLY RELEVANT to that client

export class TailoredGameState {
    constructor(public myId: string) {}
}