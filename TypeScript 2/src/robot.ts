class Robot {
    private _Name: string;
    private _Type: Type;
    private _Color: string
    private _Phrase: string;
    private _jump: boolean;
    private _talk: boolean;
    private _blink: boolean;

    constructor(name: string, type: Type, color: string, phrase: string, jump:boolean, talk: boolean, blink: boolean) {
        this._Name=name;
        this._Type=type;
        this._Color=color;
        this._Phrase=phrase;
        this._jump=jump;
        this._talk=talk;
        this._blink=blink;
    }

    get Name() {
        return this._Name;
    }
    set Name(name: string) {
        this._Name = name;
    }

    get Type() {
        return this._Type;
    }
    set Type(type: Type) {
        this._Type = type;
    }

    get Color() {
        return this._Color;
    }
    set Color(color: string) {
        this._Color = color;
    }

    get Phrase() {
        return this._Phrase;
    }
    set Phrase(phrase: string) {
        this._Phrase = phrase;
    }

    get Jump() {
        return this._jump;
    }
    set Jump(jump: boolean) {
        this._jump = jump;
    }

    get Talk() {
        return this._talk;
    }
    set Talk(talk: boolean) {
        this._talk = talk;
    }

    get Blink() {
    return this._blink;
    }
    set Blink(blink: boolean) {
        this._blink = blink;
    }
}