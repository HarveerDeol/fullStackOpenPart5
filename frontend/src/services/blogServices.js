import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'


let token = null


const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
    try {
        const response = await axios.get(baseUrl)
        return response.data
    } catch (error) {
        console.error("Error fetching data:", error)
        throw error
    }
}


export default { getAll, setToken }
