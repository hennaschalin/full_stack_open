export const Notification = ({ message, setErrorMessage }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="notice">
        {message}
      </div>
    )
  }

 export const Error = ({ message, setConfirmation }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }