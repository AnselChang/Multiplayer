import { Subject } from "rxjs";

export class Player {

    private _x: number;
    private _y: number;

    public onPositionUpdate$ = new Subject<void>();

    constructor(
        public id: string,
        public isMe: boolean,
        public name: string,
        x: number,
        y: number,
    ) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public setPosition(x: number, y: number) {
        this._x = x;
        this._y = y;
        this.onPositionUpdate$.next();
    }

    public getPosition(): {x: number, y: number} {
        return {x: this._x, y: this._y};
    }

}