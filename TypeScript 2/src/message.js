"use strict";
class Message {
    constructor(name, color, text, date) {
        this._Name = name;
        this._Color = color;
        this._Text = text;
        this._Date = date;
    }
    get Name() {
        return this._Name;
    }
    set Name(name) {
        this._Name = name;
    }
    get Color() {
        return this._Color;
    }
    set Color(color) {
        this._Color = color;
    }
    get Text() {
        return this._Text;
    }
    set Text(text) {
        this._Text = text;
    }
    get Date() {
        return this._Date;
    }
    set Date(date) {
        this._Date = date;
    }
}
