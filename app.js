//Declaracion de variables
//let contenedorCarrito = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let PrecioTotal = document.querySelector('.price-total')
let Totalproductos = document.querySelector('.count-product');
let carrito= [];
let productos = []

class Producto {
    constructor(id,img,price,description){
        this.id= id;
        this.img= img;
        this.price=price;
        this.description=description;
    }
    mostrarProducto(){
        const div= document.getElementById('products');
        div.innerHTML += `
            <div class="carts">
                <div>
                    <img src=${this.img} alt="foto del cupon" />
                    <p><span>${this.price}</span>$</p>
                </div>
                <p class="title">${this.description}</p>
                <button class="btn-add-cart" id=${this.id} >Agregar cupon</button>
            </div>`
    }
    agregarEvento(){
        const boton =document.getElementById(`${this.id}`)
        const cupon =productos.find(e =>e.id == this.id)
        boton.addEventListener('click', () => agregarNuevoProducto(cupon))
    }
}

const prod1= new Producto('01','./images/asus.png',10,"Cupon de 10$ en productos de la seccion portatiles  marca ASUS en Mercado Liebre")
const prod2= new Producto('02','./images/logiteck.jpg',5,"Cupon de 5$ en teclados marca Logizteck")
const prod3= new Producto('03','./images/alonex-removebg-preview.png',15,"Cupon de 15$ en envios AlonExpress")
const prod4= new Producto('04','./images/walmart-removebg-preview.png', 20,"Cupon de 20$ para compras del hogar en almacenes Wonmalrk")
const prod5= new Producto('05','./images/pizza.png', 12,"Cupon de 12$ en pizza mario")
const prod6= new Producto('06','./images/kfc.jpeg',5,"Cupon de 10$ en productos de la seccion portatiles  marca ASUS en Mercado Liebre")
const prod7= new Producto('07','./images/hilton.jpg',30,"Cupon de 30$ en hoteles Hiktwon")
const prod8= new Producto('08','./images/amazon.jpg',15,"Cupon de 15$ en envios Ameizon")
const prod9= new Producto('09','./images/frisby.jpg',10,"Cupon de 10$ en restaurantes de la cadena Pollo Frasby")
const prod10= new Producto('10','/images/bigmac-removebg-preview.png',5.81,"Cupon una Big Mec gratis en tu Mec Donals mas cercano")
const prod11= new Producto('11','./images/nike-removebg-preview.png',10,"Cupon de 10$ en cualquier almacen Mike del pais")

productos.push(prod1,prod2,prod3,prod4,prod5,prod6,prod7,prod10,prod11)

productos.forEach(producto => {
    producto.mostrarProducto()
})
productos.forEach(producto =>{
    producto.agregarEvento()
})

let totalCard = 0;
let ConteoProducto = 0;

//Creacion de Funciones
//InteraccionCarrito();
//function InteraccionCarrito(){
  //  contenedorCarrito.addEventListener('click', AgregarNuevoProducto);
    //containerBuyCart.addEventListener('click', EliminarProducto);
//}
//añadir producto al carrito
function agregarNuevoProducto(cupon){
    carrito.push(cupon);
    console.log(carrito)
}

//Agregar (si el producto que se agregara no esta en el carrito, lo agrege sumandole una propiedad cantidad: 1)
//Si el producto esta en el carrito sumar la cantidad a 2..

//NOT WORKING
//eliminar productos del carrito
function EliminarProducto(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');
        productos.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });

        productos = productos.filter(product => product.id !== deleteId);
        ConteoProducto--;
    }
    if (productos.length === 0) {
        PrecioTotal.innerHTML = 0;
        Totalproductos.innerHTML = 0;
    }
    loadHtml();
}
//AQUI NOT WORKING
//Mostrar contenido del carrito
function MostrarContenido(product){
    localStorage.removeItem("carrito");
    var infoProduct = {};
    try{
         infoProduct = JSON.parse(product);
    }catch(e){
         infoProduct = {
            //img: product.querySelector('div img').src,
            //description: product.querySelector('.title').textContent,
            //price: product.querySelector('div p span').textContent,
            //id: product.querySelector('a').getAttribute('data-id'),
            //amount: 1
        }
    }

//total lista y precio
    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);
    const exist = productos.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = productos.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        //Uso del spreed Operator
        productos = [...pro];
    } else {
        productos = [...productos, infoProduct]
        ConteoProducto++;
    }

    //Creacion del objeto en el local storage
    const obj = Object.assign({}, productos.map);
    l_com = JSON.stringify(obj);
    localStorage.setItem("carrito", l_com);
    loadHtml();

}
//Crear un evento a una funcion para mostrar y cerrar el carrito

function showCart(x){
    document.getElementById("products-id").style.display = "block";
}
function closeBtn(){
     document.getElementById("products-id").style.display = "none";
}

function loadHtml(){
    clearHtml();
    productos.forEach(product => {
        const {img, description, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${img}" alt="">
            <div class="item-content">
                <h5>${description}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        PrecioTotal.innerHTML = totalCard;

        Totalproductos.innerHTML = ConteoProducto;
    });
}
 function clearHtml(){
   containerBuyCart.innerHTML = '';

}