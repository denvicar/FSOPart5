import React, { useState } from 'react'

const CreateForm = ({ createPost }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddPost = (event) => {
    event.preventDefault()

    const newPost = {
      title, author, url
    }

    createPost(newPost)

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddPost}>
        <label htmlFor="title">title <input name="title" value={title} onChange={({ target }) => setTitle(target.value)} /></label>
        <br />
        <label htmlFor="author">author <input name="author" value={author} onChange={({ target }) => setAuthor(target.value)}  /></label>
        <br />
        <label htmlFor="url">url <input name="url" value={url} onChange={({ target }) => setUrl(target.value)}  /></label>
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateForm