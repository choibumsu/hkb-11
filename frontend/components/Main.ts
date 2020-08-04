import { Component } from '.'
import router from '../router'
import { ROUTER } from '../utils/constants'
import { Login } from './Login'
import LoginView from './Login/view'
import MainView from './Main/view'
import NavigationView from './Navigator/view'
export class Main extends Component<MainView> {
  navigationView: NavigationView
  loginView: LoginView
  login: Login
  constructor(view) {
    super(null, view)
    this.loginView = new LoginView()
    this.login = new Login(this, this.loginView)
    router.add('login', [this.login])
    router.on(ROUTER.CHANGE_DATE, ({ year, month }) => {
      this.navigationView.setDate(year, month)
    })
    router.on(ROUTER.MUTATE_VIEW, ({ path, flag }) => {
      if (path === 'login') {
        if (flag) {
          this.navigationView.remove()
          this.loginView.appendToView(this.view)
          return
        }
        this.loginView.remove()
        this.navigationView.appendToView(this.view)
      }
    })
    this.navigationView = this.view.navigatorView
  }
}
