import  express  from "express";
import cookieParser from 'cookie-parser';
//__direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {methods as authentication} from "./controllers/authentication.controller.js"
import {methods as authorization} from "./middlewares/authorization.js";

//Servidor en puerto 3000
const app = express();
app.set("port",3000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",app.get("port"));

//Configuración
app.use(express.static(__dirname + "/assets"));
app.use(express.json());
app.use(cookieParser())


//Rutas
app.get("/",authorization.publico, (req,res)=> res.sendFile(__dirname + "/index.html"));
app.get("/admin",authorization.privado,(req,res)=> res.sendFile(__dirname + "/admin.html"));
app.post("/api/login",authentication.login);
