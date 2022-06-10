"use strict";
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
    get Name() {
        return this._Name;
    }
    set Name(name) {
        this._Name = name;
    }
    get Type() {
        return this._Type;
    }
    set Type(type) {
        this._Type = type;
    }
    get Color() {
        return this._Color;
    }
    set Color(color) {
        this._Color = color;
    }
    get Phrase() {
        return this._Phrase;
    }
    set Phrase(phrase) {
        this._Phrase = phrase;
    }
    get Jump() {
        return this._jump;
    }
    set Jump(jump) {
        this._jump = jump;
    }
    get Talk() {
        return this._talk;
    }
    set Talk(talk) {
        this._talk = talk;
    }
    get Blink() {
        return this._blink;
    }
    set Blink(blink) {
        this._blink = blink;
    }
}
