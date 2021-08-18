require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const axios = require('axios');

axios.defaults.headers.common['X-Authorization'] = process.env.API_KEY;
axios.defaults.baseURL = process.env.API_URL;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const MAIN_PATH = "/henko-api/v1/"

app.get(MAIN_PATH, (req, res) => {
    res.json({ message: "Welcome to Henko API Restful By Async Ideas y Negocios (v1)" });
});


app.post(MAIN_PATH + "properties/", async (req, res) => {

    const data = req.body;

    const page = data.page ? "?page=" + data.page : "";
    const operationType = data.operation_type ? "&search%5Boperation_type%5D=" + data.operation_type : "";
    const minPrice = data.min_price ? "&search%5Bmin_price%5D=" + data.min_price : "";
    const maxPrice = data.max_price ? "&search%5Bmax_price%5D=" + data.max_price : "";
    const minBedrooms = data.min_bedrooms ? "&search%5Bmin_bedrooms%5D=" + data.min_bedrooms : "";
    const minBathrooms = data.min_bathrooms ? "&search%5Bmin_bathrooms%5D=" + data.min_bathrooms : "";
    const minParkingSpaces = data.min_parking_spaces ? "&search%5Bmin_parking_spaces%5D=" + data.min_parking_spaces : "";
    const minConstructionSize = data.min_construction_size ? "&search%5Bmin_construction_size%5D=" + data.min_construction_size : "";
    const maxConstructionSize = data.max_construction_size ? "&search%5Bmax_construction_size%5D=" + data.max_construction_size : "";
    const minLotSize = data.min_lot_size ? "&search%5Bmin_lot_size%5D=" + data.min_lot_size : "";
    const maxLotSize = data.max_lot_size ? "&search%5Bmax_lot_size%5D=" + data.max_lot_size : "";


    const url = page +
        "&limit=20" +
        "&search%5Bupdated_after%5D=2020-03-01T23%3A26%3A53.402Z" +
        "&search%5Bupdated_before%5D=2025-03-01T23%3A26%3A53.402Z" +
        operationType +
        minPrice +
        maxPrice +
        minBedrooms +
        minBathrooms +
        minParkingSpaces +
        minConstructionSize +
        maxConstructionSize +
        minLotSize +
        maxLotSize;

    await axios.get("properties" + url).then((response) => {
        res.json(response.data);
    }).catch((error) => {
        console.log(error);
    });

});

app.get(MAIN_PATH + "property/:propertyId", async (req, res) => {
    const propertyId = req.params.propertyId;
    
    await axios.get("properties/" + propertyId).then((response) => {
        res.json(response.data);
    }).catch((error) => {
        console.log(error);
    });

});


// set port, listen for requests
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('Server run on port: ' + app.get('port'));
});