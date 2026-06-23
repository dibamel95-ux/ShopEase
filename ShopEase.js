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
    <button class="btn-buy">add to cart</button>
    `;
    card.addEventListener("click", () => {
      window.location.href = `detail.html?id=${prod.id}`;
    });
    container.appendChild(card);
  });
}
let allProducts = [];
let originalPro = [];
async function getData() {
  let res = await fetch(`https://dummyjson.com/products`);
  let data = await res.json();
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
