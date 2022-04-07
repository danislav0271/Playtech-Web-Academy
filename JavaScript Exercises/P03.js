let numbers = [-21, -12, -11, -9, -5, 0, 1, 6, 17, 20, 22];
let positiveNumbers = [];

//numbers.forEach(number => number >= 0 ? positiveNumbers.push(number) : "");

numbers.forEach((n) => {
    if (n >= 0) {
        positiveNumbers.push(n);
    }
})

console.log(positiveNumbers);