import config from "./config"

const httpScheme = 'https'

export async function getOath2Url() {
    const environmentInfo = await getEnvironmentInfo()
    return httpScheme + '://login.' + environmentInfo[0] + '.aws.' + environmentInfo[1] + '.bisnode.net/as/token.oauth2'
}

async function getBaseUrl() {
    const environmentInfo = await getEnvironmentInfo()
    return httpScheme + '://sfs.' + environmentInfo[0] + '.aws.' + environmentInfo[1] + '.bisnode.net/'
}

export async function getBisnodeIdAdminUrl() {
    return await getBaseUrl() + 'bisnodeid-admin/'
}

export async function getTotpDeviceUrl() {
    return await getBisnodeIdAdminUrl() + 'totp/device/' + config.totpDeviceId
}

export async function getTotpSvcUrl() {
    return await getBaseUrl() + 'ims-totp-s/v1/devices/'
}

function getEnvironmentInfo(){

    let environment = process.env.testEnv
    let environmentColour = ''

    if ((environment == 'qa') || (environment == 'dev') || (environment == 'stage')){
        environmentColour = 'blue'
    }
    else if (environment == 'prod'){
        environmentColour = 'orange'
    }
    else {
        environment = 'qa'
        environmentColour = 'blue'
    }
    return [environment, environmentColour]
}

export async function displayEnvironment() {
    const env = await getEnvironmentInfo()
    console.log('Running tests in ' + env[0] + ' environment ...')
}