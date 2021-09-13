import {Selector} from 'testcafe'

class TotpDevicePage{

    constructor() {
        this.buttonDisable = Selector('a').withText('Set Disabled')
        this.buttonVacant = Selector('a').withText('Set Vacant')
        this.buttonConfirmDisable = Selector('input').withAttribute('value', 'Set Disabled')
        this.buttonConfirmVacant= Selector('input').withAttribute('value', 'Set Vacant')
        this.buttonLost = Selector('a').withText('Set As Lost')
        this.buttonConfirmLost = Selector('input').withAttribute('value', 'Set As Lost')
        this.buttonCancel = Selector('button').withText('Cancel')
    }
}

export default TotpDevicePage