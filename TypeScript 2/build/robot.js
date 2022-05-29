class Robot {
    constructor(name, type, color, phrase, jump, talk, blink) {
        this._Name = name;
        this._Type = type;
        this._Color = color;
        this._Phrase = phrase;
        this._jump = jump;
        this._talk = talk;
        this._blink = blink;
    }
    Name() {
        get: {
            return this._Name;
        }
    }
    Type() {
        get: {
            return this._Type;
        }
    }
    Color() {
        get: {
            return this._Color;
        }
    }
    Phrase() {
        get: {
            return this._Phrase;
        }
    }
    Jump() {
        get: {
            return this._jump;
        }
    }
    Talk() {
        get: {
            return this._talk;
        }
    }
    Blink() {
        get: {
            return this._blink;
        }
    }
}
export default Robot;
