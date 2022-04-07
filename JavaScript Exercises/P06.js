let number = 0;
let number2 = 1;
let next;

while (number <= 500) {
    console.log(number);
    next = number + number2;
    number = number2;
    number2 = next;
}