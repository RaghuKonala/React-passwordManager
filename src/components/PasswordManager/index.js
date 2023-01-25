import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const randBackgroundColor = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
  'color7',
  'color8',
]

class PasswordManager extends Component {
  state = {
    userPasswordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isChecked: false,
    screenInnerWidth: window.innerWidth,
  }

  renderNoPasswords = () => (
    <div className="no-passwords-container">
      <img
        className="no-passwords-img"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p>No Passwords</p>
    </div>
  )

  togglePasswordVisibility = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  delPasswordItem = id => {
    this.setState(prevState => ({
      userPasswordsList: prevState.userPasswordsList.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  renderAllPasswords = updatedList => {
    const {isChecked} = this.state

    return (
      <ul className="all-passwords-container">
        {updatedList.map(eachItem => (
          <PasswordItem
            key={eachItem.id}
            itemDetails={eachItem}
            isChecked={isChecked}
            deleteItem={this.delPasswordItem}
          />
        ))}
      </ul>
    )
  }

  addPasswordItem = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const bgColor =
      randBackgroundColor[
        Math.ceil(Math.random() * randBackgroundColor.length - 1)
      ]

    if (websiteInput === '') {
      alert('Enter Valid Website')
    } else if (usernameInput === '') {
      alert('Enter Valid Username')
    } else if (passwordInput === '') {
      alert('Enter Valid Password')
    } else {
      const newItem = {
        id: v4(),
        websiteInput,
        usernameInput,
        passwordInput,
        bgColor,
      }
      this.setState(prevState => ({
        userPasswordsList: [...prevState.userPasswordsList, newItem],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  addPassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  addUsername = event => this.setState({usernameInput: event.target.value})

  addWebsite = event => this.setState({websiteInput: event.target.value})

  componentDidMount = () => {
    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
  }

  resize = () => this.setState({screenInnerWidth: window.innerWidth})

  renderAppImage = screenInnerWidth => {
    if (screenInnerWidth <= 768) {
      return 'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'
    }
    return 'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
  }

  render() {
    const {
      userPasswordsList,
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      isChecked,
      screenInnerWidth,
    } = this.state

    const updatedList = userPasswordsList.filter(eachItem =>
      eachItem.websiteInput.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <div className="app-manager">
          <div className="app-logo-container">
            <img
              className="app-logo"
              alt="app logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            />
          </div>
          <div className="app-inputs-container">
            <div className="app-image-container">
              <img
                className="app-image"
                src={this.renderAppImage(screenInnerWidth)}
                alt="password manager"
              />
            </div>
            <form
              className="app-inputs-form-container"
              onSubmit={this.addPasswordItem}
            >
              <h1 className="app-inputs-title">Add New Password</h1>
              <div className="each-input-container">
                <img
                  className="each-input-icon"
                  alt="website"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.addWebsite}
                  value={websiteInput}
                  className="each-input-box"
                />
              </div>
              <div className="each-input-container">
                <img
                  className="each-input-icon"
                  alt="username"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.addUsername}
                  value={usernameInput}
                  className="each-input-box"
                />
              </div>
              <div className="each-input-container">
                <img
                  className="each-input-icon"
                  alt="password"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.addPassword}
                  value={passwordInput}
                  className="each-input-box"
                />
              </div>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="passwords-container">
            <div className="passwords-handler">
              <div className="passwords-handler-header">
                <h1 className="passwords-container-title">Your Passwords</h1>
                <p className="passwords-count">{userPasswordsList.length}</p>
              </div>
              <div className="search-container">
                <img
                  className="search-icon"
                  alt="search"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                />
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.updateSearchInput}
                  value={searchInput}
                  className="search-box"
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox"
                checked={isChecked}
                onChange={this.togglePasswordVisibility}
              />
              <label className="checkbox-label" htmlFor="checkbox">
                Show passwords
              </label>
            </div>
            {updatedList.length !== 0 && this.renderAllPasswords(updatedList)}
            {updatedList.length === 0 && this.renderNoPasswords()}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
