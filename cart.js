let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let cartProducts = [];
async function getData() {
  for (let item of cartItems) {
    let res = await fetch(`https://dummyjson.com/products/${item.id}`);
    let product = await res.json();
    cartProducts.push({
      ...product,
      quantity: item.quantity,
    });
  }
  display(cartProducts);
}
getData();
function display(arr) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  arr.forEach((product) => {
    container.innerHTML += `
       <td><img src="${product.thumbnail}"></td> 
       <td><h3>${product.title}</h3></td> 
       <td><p>Price: ${product.price}$</p></td> 
        <td><p>Quantity: ${product.quantity}</p></td>
        <td><p>Total: ${product.price * product.quantity}$</p></td>
        <td> <button class="delete" onclick="delPro()">
        <span class="material-symbols-outlined">delete</span></button></td>
    `;
  });
}
function delPro() {
  cartProducts.splice(product, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  display(cartProducts);
}
