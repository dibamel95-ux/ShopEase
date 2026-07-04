let cartItem = JSON.parse(localStorage.getItem(`cartItems`)) || [];
let cartProduct = [];
async function getData() {
  for (let item of cartItem) {
    let res = await fetch(`https://dummyjson.com/products/${item.id}`);
    let data = await res.json();
    cartProduct.push({
      ...data,
      quantity: item.quantity,
    });
  }
  display(cartProduct);
}
getData();
function display(arr) {
  let container = document.getElementById(`container`);
  container.innerHTML = "";
  arr.forEach((prod) => {
    container.innerHTML += ` <tr>
  <td> <img src="${prod.thumbnail}"></td>
  <td><h3>${prod.title}</h3></td>
  <td><p>Price: ${prod.price}</p></td>
  <td><p> Quantity: ${prod.quantity}</p></td>
  <td><p>Total: ${prod.price * prod.quantity}</p></td>
  <td><button class="delete" onclick="deleteProduct(${prod.id})"> <span class="material-symbols-outlined">delete</span></button></td>
  </tr>`;
    let cartTotal = document.getElementById("totalPrice");
    let result = 0;
    arr.forEach((product) => {
      result += product.price * product.quantity;
    });
    cartTotal.textContent = `$${result.toFixed(2)}`;
  });
}

function deleteProduct(id) {
  cartProduct = cartProduct.filter((product) => product.id !== id);
  cartItem = cartItem.filter((item) => item.id !== id);
  localStorage.setItem("cartItems", JSON.stringify(cartItem));
  let cartTotal = document.getElementById("totalPrice");
  cartTotal.innerHTML = "0$";
  display(cartProduct);
}
