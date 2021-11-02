import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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
      blogService.setToken(user.token)
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

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title, author, url
    }

    const createdBlog = await blogService
      .create(newBlog)
    
    setBlogs(blogs.concat(createdBlog))

  }

  const uiToRender = () => {
    if(user===null) {
      return (
        <LoginForm
          username = {username}
          password = {password}
          handleUsernameChange = {({target}) => setUsername(target.value)}
          handlePasswordChange = {({target}) => setPassword(target.value)}
          handleLogin = {handleLogin}
          />
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p><button onClick={handleLogout}>logout</button>
        <CreateForm 
          title = {title}
          author = {author}
          url = {url}
          handleTitleChange = {({target}) => setTitle(target.value)}
          handleAuthorChange = {({target}) => setAuthor(target.value)}
          handleUrlChange = {({target}) => setUrl(target.value)}
          handleNewBlog = {handleNewBlog}
          />
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