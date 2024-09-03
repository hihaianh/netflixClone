require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Key = 2280056 ... location key of Europe's London

// get city
const grabCity = async (city) => {
    const baseUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const queryParams = `?apikey=${apiKey}&q=${city}`

    const response = await fetch(baseUrl + queryParams)
    const data = await response.json();

    // get location key to search for ten day forecast
    return data[0]?.Key;

}

// get 10-day weather forecast results from city
const grabTenDayForecast = async (locationKey) => {
    const baseUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/10day/";
    const query = `${locationKey}?apikey=${apiKey}`

    const response = await fetch(baseUrl + query);
    const data = await response.json();

    console.log(data);

}

grabTenDayForecast("2280056");

grabCity("london").then(data => {
    return grabTenDayForecast(data.Key)
}).then(data => {
    console.log(data);
}).catch(err => console.log(err));

// const apiClient = async (baseUrl, path, queryParams) => {
//     const url = new URL(`${baseUrl}${path}`)

//     if (queryParams) {
//         url.search = new URLSearchParams(queryParams);
//     }

//     const response = await fetch(url.toString(), {
//         method: "GET"
//     })

//     const isResponseJson = response.headers
//         .get("Content-Type")
//         .includes("application/json");

//     const result = isResponsejson ? await response.json() : await response.text();
//     return result;
// }

// searching for location key that is needed to retrieve the city's forecast data
// app.get('/', async (req, res) => {
//     const city = req.query.q;
    
//     const baseUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";

//     try {
//         const [results] = await apiClient(baseUrl, {
//             ...(city ? {q} : {q: "London"}),
//             apikey: apiKey
//         })

//         return res.status(200).json(results)

//     } catch (err) {
//         console.log(err);
//         return res.status(400).json({message: "Failed to retrieve weather data: ", err})
//     }
// })

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