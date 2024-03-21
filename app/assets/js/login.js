//import {methods as authentication} from "../../controllers/authentication.controller";
//import jsonwebtoken from "../../../node_modules/jws/jsonwebtoken";
const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  // const user = event.target.children.user.value;
  // const password = event.target.children.password.value;
  const username = document.getElementById('user').value;
  const password = document.getElementById('password').value;

  // console.log(username);
  // console.log(password);
  //authentication.login(username, password);

  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username, password
      })

      
    });
    if (!res.ok) {
      alert('Inicio de sesión fallido, intente nuevamente.')
    };

    const resJson = await res.json();
    console.log(resJson)

    
    if (resJson.redirect) {
      console.log(resJson.redirect);
      window.location.href = resJson.redirect;
    }
  } catch (error) {
    
    alert('Inicio de sesión fallido, intente nuevamente.');
  };

});


