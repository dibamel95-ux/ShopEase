let nameInput = document.getElementById(`name`);
let passwordInput = document.getElementById(`password`);
let emailInput = document.getElementById(`email`);
let submit = document.getElementById(`submit`);
async function addUsers() {
  name = nameInput.value;
  password = passwordInput.value;
  email = emailInput.value;
  const res = await fetch(`https://6a5a9af7ad8332e75f029a51.mockapi.io/users`, {
    method: `POST`,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  const data = await res.json();
  if (res.ok) {
    nameInput.value = ``;
    passwordInput.value = ``;
    emailInput.value = ``;
  } else {
    alert(`sorry, something went wrong`);
  }
  console.log(data);
}

submit.addEventListener("click", () => {
  if (
    nameInput.value !== `` &&
    passwordInput.value !== `` &&
    emailInput.value !== ``
  ) {
    async function getData() {
      const resp = await fetch(
        `https://6a5a9af7ad8332e75f029a51.mockapi.io/users`,
      );
      const data = await resp.json();
      const exist = data.some((user) => emailInput.value === user.email);
      if (exist) {
        alert(`email exist, please try with another adress email`);
      } else {
        addUsers();
      }
    }
    getData();
  } else {
    alert(`please check if email, password, name not empty`);
  }
});
