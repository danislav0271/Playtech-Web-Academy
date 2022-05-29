declare class Robot {
    _Name: string;
    _Type: string;
    _Color: string;
    _Phrase: string;
    _jump: boolean;
    _talk: boolean;
    _blink: boolean;
    constructor(name: string, type: string, color: string, phrase: string, jump: boolean, talk: boolean, blink: boolean);
    Name(): string;
    Type(): string;
    Color(): string;
    Phrase(): string;
    Jump(): boolean;
    Talk(): boolean;
    Blink(): boolean;
}
export default Robot;
