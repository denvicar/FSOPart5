import React from 'react'

const CreateForm = ({title,author,url,handleTitleChange,handleAuthorChange,handleUrlChange,handleNewBlog}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleNewBlog}>>
                <label htmlFor="title">title <input name="title" value={title} onChange={handleTitleChange} /></label>
                <br />
                <label htmlFor="author">author <input name="author" value={author} onChange={handleAuthorChange} /></label>
                <br />
                <label htmlFor="url">url <input name="url" value={url} onChange={handleUrlChange} /></label>
                <br />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateForm