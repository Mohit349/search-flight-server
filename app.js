const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const flightsData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/flight-data.json`));
app.get('/searchFlights', async (req, res) => {
    const { query: { source, destination, index } } = req;
    let output = flightsData.filter((el) => {
        return el.from === source && el.to === destination;
    });
    output = output.splice(index, 20);
    await delay();
    res.status(200).json({
        status: "success",
        result: output
    })
});
//delay has been added intensionally  to show loader on client side
const delay = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 200);
    })
}
const port = 8080;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});