import {t} from 'testcafe'
import BisnodeIdAdminLoginPage from "../page-objects/pages/BisnodeIdAdminLoginPage"
import {insertTotpDevice, deleteTotpDevice} from "../configs/helper"
import {getBisnodeIdAdminUrl, getTotpDeviceUrl, displayEnvironment} from "../configs/app.urls"
import TotpDevicePage from "../page-objects/pages/TotpDevicePage"

const bisnodeIdLoginPage = new BisnodeIdAdminLoginPage()
const totpDevicePage = new TotpDevicePage()

fixture `Switch between TOTP Device states`
    .before(async ()=>{
        await displayEnvironment()
        await insertTotpDevice()
    })
    .beforeEach(async ()=>{
        await t.navigateTo(await getBisnodeIdAdminUrl())
        await bisnodeIdLoginPage.loginToBisnodeIdAdmin()
    })
    .after(async ()=>{
        await deleteTotpDevice()
    })

test('Change TOTP Device State from Vacant to Disabled', async t=>{
    await t
        .navigateTo(await getTotpDeviceUrl())
        .click(totpDevicePage.buttonDisable)
        .click(totpDevicePage.buttonConfirmDisable)
        .expect((totpDevicePage.buttonVacant).visible).ok()
        .expect((totpDevicePage.buttonLost).visible).ok()
})

test('Change TOTP Device State from Disabled to Vacant', async t=>{
    await t
        .navigateTo(await getTotpDeviceUrl())
        .click(totpDevicePage.buttonVacant)
        .click(totpDevicePage.buttonConfirmVacant)
        .expect((totpDevicePage.buttonDisable).visible).ok()
        .expect((totpDevicePage.buttonLost).visible).ok()
})

test('Try To Change TOTP Device State From Vacant to Disable, Then Cancel', async t=>{
    await t
        .navigateTo(await getTotpDeviceUrl())
        .click(totpDevicePage.buttonDisable)
        .click(totpDevicePage.buttonCancel)
        .expect((totpDevicePage.buttonDisable).visible).ok()
        .expect((totpDevicePage.buttonLost).visible).ok()
})