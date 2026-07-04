let dataPro = JSON.parse(localStorage.getItem(`cartItems`)) || [];
function display(arr) {
  let container = document.getElementById(`container`);
  container.innerHTML = "";
  arr.forEach((prod) => {
    let card = document.createElement(`div`);
    card.classList.add(`card`);
    card.innerHTML += `
    <img src="${prod.thumbnail}">
    <h3>${prod.title}</h3>
    <span class="price">Price: ${prod.price} $</span>
    <button class="btnBuy">add to cart</button>
    `;
    card.addEventListener("click", () => {
      window.location.href =`detail.html?id=${prod.id}`;
    });
    const myBtn = card.querySelector(".btnBuy")
    myBtn.addEventListener("click" , (event) => {
      event.stopPropagation()
      let newObj = {
        id: prod.id,
        quantity: 1,
      };
      let exist = dataPro.find((itm) => itm.id === newObj.id);
      if (exist) {
        exist.quantity++;
      } else {
        dataPro.push(newObj);
      }
      localStorage.setItem(`cartItems`, JSON.stringify(dataPro));
      updateCartCount();
      showToast();
    })
    container.appendChild(card);
  });
}
let allProducts = [];
let originalPro = [];
async function getData() {
  let res = await fetch(`https://dummyjson.com/products`);
  let data = await res.json();
  console.log(data)
  allProducts = data.products;
  originalPro = [...data.products];
  display(allProducts);
}
getData();

function searchData(value) {
  let newArr = allProducts.filter((product) =>
    product.title.toLowerCase().includes(value.toLowerCase()),
  );
  display(newArr);
}

function priceSort(value) {
  if (value === ``) {
    display(originalPro);
    return;
  }
  if (value === `low`) {
    allProducts.sort((a, b) => a.price - b.price);
  } else {
    allProducts.sort((a, b) => b.price - a.price);
  }
  display(allProducts);
}
function categorySort(value) {
  if (value === ``) {
    display(originalPro);
    return;
  }
  let filtred = allProducts.filter((prod) => prod.category === value);
  display(filtred);
}
function updateCartCount() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerHTML = total;
}
updateCartCount()
let cart = document.querySelector(`.cart`);
cart.addEventListener("click", () => {
  window.location.href = `cart.html`;
});
function showToast() {
  const toast = document.getElementById("toast");

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
