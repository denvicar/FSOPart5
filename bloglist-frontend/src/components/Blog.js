import React, { useState } from 'react'

const Blog = ({ blog,addLikes,handleDelete }) => {
  const [detailView, setDetailView] = useState(false)
  const displayDetail = { display: detailView? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetail = () => {
    setDetailView(!detailView)
  }

  const postByUser = (blog.user && blog.user.username === JSON.parse(window.localStorage.getItem('loggedUser')).username)

  return(
    <>
      <div style={blogStyle} className='blogGeneral'>
        {blog.title} {blog.author} <button onClick={toggleDetail}>{detailView ? 'hide' : 'show'}</button>
      </div>
      <div style={displayDetail} className='blogDetail'>
        <div style = {blogStyle}>
          {blog.url} <br />
          likes {blog.likes} <button onClick={addLikes}>like</button> <br />
          {blog.user && blog.user.name} <br />
          <button onClick={handleDelete} hidden={!postByUser}>delete</button>
        </div>
      </div>
    </>
  )
}

export default Blog