import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog,addLikes}) => {
  const [detailView, setDetailView] = useState(false)
  const displayDetail = {display: detailView? '' : 'none'}

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

  return(
    <>
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleDetail}>{detailView ? 'hide' : 'show'}</button>
    </div> 
    <div style={displayDetail}>
      <div style = {blogStyle}>
      {blog.url} <br />
      likes {blog.likes} <button onClick={addLikes}>like</button> <br />
      {blog.user && blog.user.name}
      </div>
    </div>
    </>
  ) 
}

export default Blog