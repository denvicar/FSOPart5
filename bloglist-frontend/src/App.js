import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [okMessage, setOkMessage] = useState('')
  const createBlogFormRef = useRef()


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
      setOkMessage(`Welcome ${user.username}, log in successful`)
      setTimeout(() => {
        setOkMessage('')
      }, 5000);
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(()=>setErrorMessage(''),5000)
    }
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    setOkMessage('Log out successful')
    setTimeout(() => {
      setOkMessage('')
    }, 5000);
  }

  const handleNewBlog = (post) => {
    console.log(createBlogFormRef)
    createBlogFormRef.current.toggleVisiblity()
    blogService
      .create(post)
      .then(createdBlog=>{
        setBlogs(blogs.concat(createdBlog))
        setOkMessage(`new blog ${createdBlog.title} by ${createdBlog.author} created`)
        setTimeout(()=>setOkMessage(''),5000)
      })
  }

  const addLikes = async (id) => {
    const blogToUpdate = blogs.find(b=>b.id===id)
    const updatedBlog = await blogService
      .updateLikes({id, likes: blogToUpdate.likes + 1})
    updatedBlog.user = blogToUpdate.user
    setBlogs(blogs.map(b=> b.id===id ? updatedBlog : b))
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
        <Togglable buttonLabel='create note' ref={createBlogFormRef}>
        <CreateForm 
          createPost = {handleNewBlog}
          />
          </Togglable>
        {blogs.map(b=><Blog key={b.id} blog={b} addLikes={()=>addLikes(b.id)}/>)}
      </div>
    )
    
  }

  return (
    <>
    <Notification errorMessage = {errorMessage} okMessage = {okMessage} />
    {uiToRender()}
    </>
  )
}

export default App