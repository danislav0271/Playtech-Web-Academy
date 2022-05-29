"use strict";
class Message {
    constructor(name, color, text, date) {
        this._Name = name;
        this._Color = color;
        this._Text = text;
        this._Date = date;
    }
    Name() {
        get: {
            return this._Name;
        }
    }
    Color() {
        get: {
            return this._Color;
        }
    }
    Text() {
        get: {
            return this._Text;
        }
    }
    Date() {
        get: {
            return this._Date;
        }
    }
}
