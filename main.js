// Exercise 1

let usuarios = ['marcelo', 'carlos', 'tomas', 'mauricio', 'sofia', 'gaston'];

const verificarDisponibilidadUsuario = async (username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (let i = 0; i < usuarios.length; i++) {
                if (username.toLowerCase() === usuarios[i].toLowerCase()) {
                    reject("The username " + username + " was already taken");
                }
            }
            usuarios.push(username.toLowerCase());
            resolve("The username " + username + " is available");
        }, 2000)
    })
}

verificarDisponibilidadUsuario("juan")
    .then((value) => console.log(value))
    .catch((error) => console.log("An error has ocurred: " + error));

// Exercise 2

const productos = [
    { id: 1, nombre: 'Laptop', precio: 1200, stock: 10 },
    { id: 2, nombre: 'Teléfono móvil', precio: 800, stock: 0 },
    { id: 3, nombre: 'Tablet', precio: 500, stock: 15 },
    { id: 4, nombre: 'Smartwatch', precio: 300, stock: 30 },
    { id: 5, nombre: 'Auriculares inalámbricos', precio: 150, stock: 0 }
];

const loadProducts = () => {
    const productsContainer = document.getElementById("products-container");
    productos.forEach((product) => {
        let productDiv = document.createElement("div");
        productDiv.setAttribute("class", "product");
        let taskTitle = document.createElement("h3");
        let titleText = document.createTextNode(product.nombre);
        taskTitle.appendChild(titleText);
        productDiv.appendChild(taskTitle);
        let taskPrice = document.createElement("p");
        let priceText = document.createTextNode("Precio: $ " + product.precio);
        taskPrice.appendChild(priceText);
        productDiv.appendChild(taskPrice);

        if (product.stock > 0) {
            let buyButton = document.createElement("button");
            let buyButtonText = document.createTextNode("Comprar");
            buyButton.appendChild(buyButtonText);
            buyButton.addEventListener("click", () => procesoDeCompra(product))
            buyButton.setAttribute("class","buy-button")
            productDiv.appendChild(buyButton);
        } else {
            let soldOut = document.createElement("p");
            soldOut.setAttribute("class", "sold-out")
            let soldOutText = document.createTextNode("Agotado");
            soldOut.appendChild(soldOutText);
            productDiv.appendChild(soldOut);
        }

        productsContainer.appendChild(productDiv);
    }
    );
}

const procesoDeCompra = async (product) => {
    let buyButtons = document.getElementsByClassName("buy-button");
    for (const button of buyButtons){
        button.setAttribute("disabled","true")
    }
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if (product.stock > 0){
                let totalPrice = product.precio + product.precio * 0.03;
                alert("El producto está disponible en stock y el precio con el recargo por uso de la web sería de $ " + totalPrice +". Presione OK para finalizar su compra.")
                for (const button of buyButtons){
                    button.removeAttribute("disabled")
                }
                resolve("El producto está disponible para su compra");
            } else{
                alert("El producto no tiene suficiente stock")
                for (const button of buyButtons){
                    button.removeAttribute("disabled")
                }
                reject("El producto no está disponible para su compra.")
            }
            
        },
    1300)
    })
}

loadProducts()