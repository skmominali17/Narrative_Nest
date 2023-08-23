import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ejs from "ejs";
import router from "./routes";

const app = express();

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(cors());
app.use("/", router);

export default app;
