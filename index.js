import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import weatherData from "./utils/weatherData.js";
import env from "dotenv";

env.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs")

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
