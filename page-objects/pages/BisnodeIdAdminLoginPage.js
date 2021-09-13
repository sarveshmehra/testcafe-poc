import {Selector, t} from 'testcafe'
import Navbar from "../components/navbar"
import config from "../../configs/config"

const navbar = new Navbar()

class BisnodeIdAdminLoginPage{

    constructor() {
        this.inputUserName = Selector('#username')
        this.inputPassword = Selector('#password')
        this.buttonLogin = Selector('#button_login')
    }

    async loginToBisnodeIdAdmin(){
        await t
            .typeText(this.inputUserName, config.username, {paste:true, replace:true})
            .typeText(this.inputPassword, config.password, {paste:true, replace:true})
            .click(this.buttonLogin)
            .expect(navbar.loggedInUserName.innerText).contains(config.username,"Login to Bisnode Id Admin failed.")
    }
}

export default BisnodeIdAdminLoginPage