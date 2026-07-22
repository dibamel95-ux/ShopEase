const email = document.getElementById(`email`);
const password = document.getElementById(`password`);
const submit = document.getElementById(`submit`);
let dataUsers = [];
async function getData() {
  const res = await fetch(`https://6a5a9af7ad8332e75f029a51.mockapi.io/users`);
  const data = await res.json();
  dataUsers = data;
}
getData();
submit.addEventListener("click", () => {
  if (email.value !== `` && password.value !== ``) {
    const exist = dataUsers.find(
      (user) => user.email === email.value && user.password === password.value,
    );
    if (exist) {
      let currentUser = {
        id: exist.id,
        name: exist.name,
        email: exist.email,
      };
      localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
      window.location.href = "ShopEase.html";
    } else {
      alert(`please check your Email / Password`);
    }
  } else {
    alert(`enter your Email and Password`);
  }
});

