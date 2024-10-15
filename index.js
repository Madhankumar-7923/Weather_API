import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import weatherData from "./utils/weatherData.js";
import env from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

env.config();

const app = express();
const port = process.env.PORT || 3000;

// Get the directory name from the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));

// set the public files directory
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(express.static("public"));*/

app.set("view engine", "ejs");

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/weather", (req, res) => {

    if (!req.query.address) {
        return res.send("Address is Required");
    }

    weatherData(req.query.address, (error, result) => {
        if (error) {
            return res.send(error);
        }

        res.send(result);
    });

});

app.get("*", (req, res) => {
    res.render("404", { title: "404 - Page Not Found" });
});

app.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
});
