const AdData = require("../models/AdData");
const cryptoUtils = require("../utils/CryptoUtils");
const utils = require("../utils/Utils");

const getAllData = async (req, res) => {
    await handleAdServiceRequest(req, res);
}

async function handleAdServiceRequest(req, res) {
    try {
        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).send(cryptoUtils.encryptString(utils.REQUEST_BODY_EMPTY));
        }

        const { deviceId, v, packageName } = req.body

        if (!deviceId || !v || !packageName) {
            return res.status(400).send(cryptoUtils.encryptString(utils.REQUIRED_FILED_MESSING))
        }

        if (!cryptoUtils.isStringEncrypted(deviceId) || !cryptoUtils.isStringEncrypted(v) || !cryptoUtils.isStringEncrypted(packageName)) {
            return res.status(400).send(cryptoUtils.encryptString(utils.PLEASE_SEND_ENCRYPTED_Value))
        }

        if (cryptoUtils.decryptString(packageName) === cryptoUtils.decryptString(utils.APP_PACKAGE_NAME)) {
            const AllAdData = await AdData.find({});

            if (req.query.dec === utils.API_DEC_QUERY) {
                AllAdData.forEach(ad => {
                    res.json(getStandardResponse(true, "", ad));

                });
            } else {
                AllAdData.forEach(AdData => {
                    const allAdDataString = JSON.stringify(getStandardResponse(true, "", AdData));
                    const encryptedData = cryptoUtils.encryptString(allAdDataString);
                    res.send(encryptedData);
                });
            }

        } else {
            res.status(400).send(getStandardResponse(false, cryptoUtils.encryptString(utils.PLEASE_SEND_VAlid_DATA)));
        }


    } catch (error) {
        res.status(500).send(cryptoUtils.encryptString(utils.INTERNAL_SERVER_ERROR));
    }
};

const updateAdServiceData = async (req, res) => {
    await handleUpdateDataRequest(req, res);
};

async function handleUpdateDataRequest(req, res) {
    if (!req.body || !Object.keys(req.body).length === 0) {
        return res.status(400).send(cryptoUtils.encryptString(utils.REQUEST_BODY_EMPTY));
    }

    const { adServiceId } = req.body
    const requestBody = req.body

    const decryptedRequestBody = {};
    for (const key in requestBody) {
        if (!cryptoUtils.isStringEncrypted(requestBody[key])) {
            return res.status(400).send(cryptoUtils.encryptString(utils.PLEASE_SEND_ENCRYPTED_Value));
        }
        decryptedRequestBody[key] = cryptoUtils.decryptString(requestBody[key]);
    }

    adServiceUpdateOneData(cryptoUtils.decryptString(adServiceId), decryptedRequestBody).then(async adData => {
        const AllAdData = await AdData.find({});

        if (req.query.dec === utils.API_DEC_QUERY) {
            AllAdData.forEach(ad => {
                res.json(getStandardResponse(true, "", ad));
            });
        } else {
            AllAdData.forEach(AdData => {
                const AllAdDataString = JSON.stringify(getStandardResponse(true, "", AdData));
                const encryptData = cryptoUtils.encryptString(AllAdDataString);
                res.send(encryptData);
            });
        }
    }).catch(error => {
        res.status(500).send(cryptoUtils.encryptString(utils.DATA_MODIFIED_ERROR));
    });
}

const adServiceUpdateOneData = async (adServiceId, decryptedRequestBody) => {
    try {
        const _id = adServiceId;
        const adData = await AdData.findByIdAndUpdate(_id, decryptedRequestBody);
        return adData;
    } catch (error) {
        console.error("Error:", error.message);
        return Promise.reject(error.message);
    }
};

function getStandardResponse(status, message, data) {
    return {
        success: status,
        message: message,
        data: data
    }
};

module.exports = { getAllData, updateAdServiceData };