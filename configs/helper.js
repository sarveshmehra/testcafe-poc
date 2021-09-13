import axios from "axios"
import config from "./config"
import {getOath2Url, getTotpSvcUrl} from "./app.urls"

async function getBearerToken() {

    let requestConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: `${config.authUsername}`,
            password: `${config.authPassword}`
        },
    };

    let requestData = 'scope=totp&grant_type=client_credentials'

    return  axios.post(await getOath2Url(), requestData, requestConfig)
        .then((response) => {
            return response.data.access_token
        })
        .catch((error) => {
            console.log("An error occurred while obtaining access token:  ", error)
        })
}

export async function insertTotpDevice() {

    const bearerToken = await getBearerToken()
    let requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        }
    };

    let requestData='{\n' +
        '  "customerContractId": "testCustomer",\n' +
        '  "customerContractIdType": "TestContractType",\n' +
        '  "deviceInfo": {\n' +
        '    "manufacturer": "Test VERISEC",\n' +
        '    "model": "Test:Verisec:Generic:HMAC-SHA1",\n' +
        '    "serialNumber": " ' + config.totpDeviceId + ' "\n' +
        '  },\n' +
        '  "encryptionMethod": "NONE",\n' +
        '  "secret": {\n' +
        '    "decrypted": "string",\n' +
        '    "encrypted": "string"\n' +
        '  },\n' +
        '  "state": "VACANT",\n' +
        '  "time": 0,\n' +
        '  "timeInterval": 0,\n' +
        '  "deviceId": " ' + config.totpDeviceId + ' "\n' +
        '}'

    axios.post(await getTotpSvcUrl(), requestData, requestConfig)
        .then((response) => {
            console.log("New TOTP Device added.")
        })
        .catch((error) => {
            console.log("Add new TOTP Device Error:", error.statusCode, error.statusMessage)
        })
}

export async function deleteTotpDevice(){

    const bearerToken = await getBearerToken()

    let requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        }
    };

    axios.delete(await getTotpSvcUrl() + config.totpDeviceId, requestConfig)
        .then((response) => {
            console.log("TOTP Device deleted.")
        })
        .catch((error) => {
            console.log("TOTP DELETION ERROR: ", error.statusCode, error.statusMessage)
        })
}