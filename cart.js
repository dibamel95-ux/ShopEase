let currentUser = JSON.parse(localStorage.getItem(`currentUser`));
let cartItem = JSON.parse(localStorage.getItem(`cartItems_${currentUser.id}`)) || [];
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
  <td>
  <button onclick="decreaseQty(${prod.id})">-</button>
  <span>${prod.quantity}</span>
  <button onclick="increaseQty(${prod.id})">+</button>
  </td>
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
  localStorage.setItem("cartItems", JSON.stringify(cartItem));
  let cartTotal = document.getElementById("totalPrice");
  cartTotal.innerHTML = "0$";
  display(cartProduct) }
}
window.onscroll = function () {
  const btn = document.getElementById("backToTop");
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

document.getElementById("backToTop").onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
