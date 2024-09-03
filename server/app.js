const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const apiClient = async (baseUrl, path, queryParams) => {
    const url = new URL(`${baseUrl}${path}`)

    if (queryParams) {
        url.search = new URLSearchParams(queryParams);
    }

    const response = await fetch(url.toString(), {
        method: "GET"
    })

    const isResponseJson = response.headers
        .get("Content-Type")
        .includes("application/json");

    const result = isResponsejson ? await response.json() : await response.text();
    return result;
}

// searching for location key that is needed to retrieve the city's forecast data
app.get('/', async (req, res) => {
    const city = req.query.q;
    
    const baseUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";

    try {
        const [results] = await apiClient(baseUrl, {
            ...(city ? {q} : {q: "London"}),
            apikey: apiKey
        })

        return res.status(200).json(results)

    } catch (err) {
        console.log(err);
        return res.status(400).json({message: "Failed to retrieve weather data: ", err})
    }
})

// 10 days of daily forecasts - london - locationKey = 328328

app.get("/forecast", async (req, res) => {
    const cityKey = 328328;

    try {
        const [results] = await axios(baseUrl, cityKey, {
            apikey: apiKey
        })

        return res.status(200).json(results);

    } catch (err) {
        console.log(err);
        return res.status(400).json({message: "Unable to find city's forecast results"})
    }
})