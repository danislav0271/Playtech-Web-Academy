let products = [
	{ product: "Shirt", price: 10 },
	{ product: "Laptop", price: 2400 },
	{ product: "Bike", price: 450 },
	{ product: "Chair", price: 150 },
	{ product: "Phone", price: 1500 },
	{ product: "Shoes", price: 60 },
	{ product: "Car", price: 25000 },
	{ product: "Coffe Machine", price: 500 }
];

let sum = 0;

products.forEach((product) => {
    if (product.price >= 0 && product.price <= 100) {
        console.log(`${product.product} - cheap`);
    }
    else if (product.price > 100 && product.price <= 500) {
        console.log(`${product.product} - normal price`);
    }
    else if (product.price > 500 && product.price <= 3000) {
        console.log(`${product.product} - expensive`);
    }
    else{
        console.log(`${product.product} - very expensive`);
    }
    sum += product.price;
});

console.log(`The total sum is: ${sum}`);
