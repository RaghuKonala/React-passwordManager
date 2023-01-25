import './index.css'

const PasswordItem = props => {
  const {itemDetails, deleteItem, isChecked} = props
  const {id, websiteInput, usernameInput, passwordInput, bgColor} = itemDetails

  const nameInitial = usernameInput[0].toUpperCase()

  const onDeleteItem = () => {
    deleteItem(id)
  }

  return (
    <li className="each-password-container">
      <div className="text-container">
        <p className={`user-profile-logo ${bgColor}`}>{nameInitial}</p>
        <div>
          <p className="each-password-details">{websiteInput}</p>
          <p className="each-password-details">{usernameInput}</p>
          {isChecked && (
            <p className="each-password-details">{passwordInput}</p>
          )}
          {!isChecked && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        testid="delete"
        className="delete-button"
        onClick={onDeleteItem}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
