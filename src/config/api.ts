import cookies from "js-cookie"

export const API_URL = 'https://candidate.neversitup.com/todo/'

export const baseUrl = (url: string) => `https://candidate.neversitup.com/todo/${url}`

export const defaultHeaders = () => {
    const token = cookies.get('jwt')
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}