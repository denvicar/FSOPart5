import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const resp = await axios
    .post(baseUrl, newBlog, config)

  return resp.data
}

const updateLikes = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const resp = await axios
    .put(`${baseUrl}/${newBlog.id}`, newBlog, config)

  return resp.data
}

const deletePost = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(`${baseUrl}/${id}`,config)
}

export default { getAll, create, setToken, updateLikes, deletePost }