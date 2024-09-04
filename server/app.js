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

// get current conditions
const grabCurrentForecast = async (locationKey) => {
    const baseForecastUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
    const queryParams = `${locationKey}?apikey=${apiKey}`

    const response = await fetch(baseForecastUrl + queryParams);
    const data = await response.json();

    return data[0];

}

// get city
const grabCity = async (city) => {
    const baseLocationUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const queryParams = `?apikey=${apiKey}&q=${city}`

    const response = await fetch(baseLocationUrl + queryParams)
    const data = await response.json();

    // get location key to search for ten day forecast
    return data[0];

}

grabCity("London")
    .then(data => {
        return grabCurrentForecast(data.Key)
    })
    // once the above promise is resolved, return all data
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
