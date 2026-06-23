async function getProduct() {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  let res = await fetch(`https://dummyjson.com/products/${id}`);
  let product = await res.json();
  let category = product.category;
  let resp = await fetch(`https://dummyjson.com/products/category/${category}`);
  let data = await resp.json();
  let related = data.products.filter((p) => p.id !== product.id);
  displayProduct(product);
  relatedPro(related);
}
getProduct();

function displayProduct(product) {
  let container = document.getElementById(`container`);
  container.innerHTML = `
 <img src="${product.images[0]}">
 <div class="info">
 <h1>${product.title}</h1>
 <div class="price">
 <span>${product.price}$</span>
</div>
<h3>Product Details</h3>
 <p>${product.description}</p>
 <button> add to cart </button>
</div>
 `;
}
function relatedPro(arr) {
  let container = document.getElementById(`relatePro`);
  container.innerHTML = "";
  arr.forEach((p) => {
    let card = document.createElement(`div`);
    card.classList.add("card");
    card.innerHTML += `
  <img src="${p.thumbnail}">
  <h3>${p.title}</h3>
  <span class="price">${p.price}$</span>  
  `;
    container.appendChild(card);
  });
}
