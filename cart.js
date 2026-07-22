let currentUser = JSON.parse(localStorage.getItem(`currentUser`));
let cartItem =
  JSON.parse(localStorage.getItem(`cartItems_${currentUser.id}`)) || [];
let cartProduct = [];
async function getData() {
  cartProduct = [];
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

  let result = 0; // حساب المجموع الكلي خارج اللوب لتفادي تكراره خطأ

  arr.forEach((prod) => {
    container.innerHTML += ` <tr>
  <td> <img src="${prod.thumbnail}"></td>
  <td><h3>${prod.title}</h3></td>
  <td><p>Price: ${prod.price}</p></td>
  <td>
  <button onclick="decreaseQty(${prod.id})">-</button>
  <span>${prod.quantity}</span>
  <button onclick="increaseQty(${prod.id})">+</button>
  </td>
  <td><p>Total: ${prod.price * prod.quantity}</p></td>
  <td><button class="delete" onclick="deleteProduct(${prod.id})"> <span class="material-symbols-outlined">delete</span></button></td>
  </tr>`;

    result += prod.price * prod.quantity;
  });

  let cartTotal = document.getElementById("totalPrice");
  if (cartTotal) {
    cartTotal.textContent = `$${result.toFixed(2)}`;
  }
}
function increaseQty(id) {
  let item = cartItem.find((p) => p.id === id);
  if (item) {
    item.quantity++;
  }
  localStorage.setItem(`cartItems_${currentUser.id}`, JSON.stringify(cartItem));
  getData();
}
function decreaseQty(id) {
  let item = cartItem.find((p) => p.id === id);
  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cartItem = cartItem.filter((p) => p.id !== id);
    }
  }
  localStorage.setItem(`cartItems_${currentUser.id}`, JSON.stringify(cartItem));
  getData();
}
function deleteProduct(id) {
  let confirmDelete = confirm("Are you sure you want to delete this product?");
  if (confirmDelete) {
    cartProduct = cartProduct.filter((product) => product.id !== id);
    cartItem = cartItem.filter((item) => item.id !== id);
    localStorage.setItem(
      `cartItems_${currentUser.id}`,
      JSON.stringify(cartItem),
    );
    display(cartProduct);
  }
}
