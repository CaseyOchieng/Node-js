const placesRoutes = require("./routes/places-routes");
const bodyParser = require("body-parser");
const express = require("express");
const port = 4000;

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes) // app.use('/api/places', placesRoutes)
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(port);

//Hey what does this function do

