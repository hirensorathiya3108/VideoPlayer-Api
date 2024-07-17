const express = require("express");
const bodyParser = require('body-parser');
const cryptoUtils = require("./utils/CryptoUtils");
const connectDB = require("./db/connect");
const utils = require("./utils/Utils");
const AdServiceRouters = require("./routers/adService");
const MonetizeProductRouters = require("./routers/MonetizeProduct");

const app = express();
const port = process.env.PORT || 8080;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(utils.API_COMMON_ROUTE, AdServiceRouters);
app.use(utils.API_COMMON_ROUTE, MonetizeProductRouters);

const start = async () => {
    try {
        await connectDB(cryptoUtils.decryptString(utils.MONGODB_URL));
        app.listen(port, () => {
            console.log(utils.CONNECTION_LIVE_PORT, port);
        });
    } catch (error) {
        console.log(error);
    }
};

start();