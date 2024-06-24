const connectDB = require("../db/connect");
const CryptoUtils = require("../utils/CryptoUtils");
const Utils = require("../utils/Utils");
const AdData = require("../models/AdData");
const AdDataJson = require("./AdData.json");
const MonetizeProduct = require("../models/MonetizeProductData");
const MonetizeProductJson = require("./MonetizeProductData.json");

const adDataSend = async () => {
    try {
        await connectDB(CryptoUtils.decryptString(Utils.MONGODB_URL));
        await AdData.deleteMany();
        await AdData.create(AdDataJson);
        console.log(Utils.SEND_DATA_INTO_DATABASE);
    } catch (error) {
        console.error("Error:", error.message);
    }
};

const MonetizeProductDataSend = async () => {
    try {
        await connectDB(CryptoUtils.decryptString(Utils.MONGODB_URL));
        await MonetizeProduct.deleteMany();
        await MonetizeProduct.create(MonetizeProductJson);
        console.log(Utils.SEND_DATA_INTO_DATABASE);
    } catch (error) {
        console.error("Error:", error.message);
    }
};


adDataSend();
// MonetizeProductDataSend();

