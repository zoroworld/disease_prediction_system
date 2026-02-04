import axios from "axios"
const VITE_API_KEY  = import.meta.env.VITE_API_KEY

const base = axios.create({
  baseURL: VITE_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
})

export default base
