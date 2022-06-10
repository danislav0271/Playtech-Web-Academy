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
    
    get Name() {
        return this._Name;
    }
    set Name(name: string | null) {
        this._Name = name;
    }

    get Color() {
        return this._Color;
    }
    set Color(color: string) {
        this._Color = color;
    }

    get Text() {
        return this._Text;
    }
    set Text(text: string) {
        this._Text = text;
    }

    get Date() {
        return this._Date;
    }
    set Date(date: string[]) {
        this._Date = date;
    }
}