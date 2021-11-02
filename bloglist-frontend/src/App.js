import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('loggedUser')
    if(user) {
      setUser(JSON.parse(user))
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username,password})
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('Wrong credentials')
    }
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const uiToRender = () => {
    if(user===null) {
      return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">username <input name="username" value={username} onChange={({target})=>setUsername(target.value)} /></label>
          <br />
          <label htmlFor="password">password <input type="password" name="password" value={password} onChange={({target}) => setPassword(target.value)} /></label>
          <br />
          <button type="submit">login</button>
        </form>
      </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p><button onClick={handleLogout}>logout</button>
        {blogs.map(b=><Blog key={b.id} blog={b} />)}
      </div>
    )
    
  }

  return (
    <>
    {uiToRender()}
    </>
  )
}

export default App