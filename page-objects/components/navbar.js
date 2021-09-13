import {Selector} from 'testcafe'

class Navbar{

    constructor() {
        this.loggedInUserName = Selector('#logged_in_username')
    }
}

export default Navbar