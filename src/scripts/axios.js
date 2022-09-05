
const token = localStorage.getItem("@kenzieRedeSocial:token");

let Headers = {}

    if(token){
        Headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
    }else{
        Headers = {
            "Content-Type": "application/json"
        }
    }

export const instance = axios.create({
    baseURL: "https://m2-rede-social.herokuapp.com/api/",
    headers: Headers
})
// instance.defaults.headers.common['Authorization'] = token;

