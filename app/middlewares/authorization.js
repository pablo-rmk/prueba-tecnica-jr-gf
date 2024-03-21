import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "./../controllers/authentication.controller.js";

dotenv.config();

function privado(req, res, next) {
  const logueado = revisarCookie(req);
  if (logueado) {
    return next()
  } else {
    return res.redirect("/")
  }
}

function publico(req, res, next) {
  const logueado = revisarCookie(req);
  if (!logueado){ 
    return next()
  } else {
    return res.redirect("/admin")
  }
  
}

function revisarCookie(req) {
  try {
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    console.log(decodificada)
    const usuarioARevisar = usuarios.find(usuario => usuario.user === decodificada.user);

    console.log(usuarioARevisar)
    if (!usuarioARevisar) {
      return false
    }
    return true;
  }
  catch {
    return false;
  }
}


export const methods = {
  privado,
  publico,
}