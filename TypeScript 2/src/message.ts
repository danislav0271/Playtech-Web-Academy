class Message {
    private _Name: string | null;
    private _Color: string;
    private _Text: string;
    private _Date: string[];
    
    constructor ( name: string | null, color: string, text: string, date:string[]) {
        this._Name=name;
        this._Color=color;
        this._Text=text;
        this._Date=date;
    }
    
    Name() {
        get: { return this._Name}
    }
    Color() {
        get: { return this._Color}
    }
    Text() {
        get: { return this._Text}
    }
    Date() {
        get: { return this._Date}
    }
}