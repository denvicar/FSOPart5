import React from 'react'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <div className='loginForm'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">username <input id="username" name="username" value={username} onChange={handleUsernameChange} /></label>
        <br />
        <label htmlFor="password">password <input id="password" type="password" name="password" value={password} onChange={handlePasswordChange} /></label>
        <br />
        <button type="submit" id="loginButton">login</button>
      </form>
    </div>
  )
}


export default LoginForm