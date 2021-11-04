import React from 'react'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">username <input name="username" value={username} onChange={handleUsernameChange} /></label>
        <br />
        <label htmlFor="password">password <input type="password" name="password" value={password} onChange={handlePasswordChange} /></label>
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  )
}


export default LoginForm