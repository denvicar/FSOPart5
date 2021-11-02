import axios from 'axios'
const baseUrl = '/api/login'

const login = async cred=> {
    const user = await axios.post(baseUrl, cred)
    return user.data
}

export default { login }