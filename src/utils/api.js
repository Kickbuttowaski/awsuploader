const BASE_URL='http://localhost:4000/api'

const API ={
    post:(path,config)=>{
        return fetch(BASE_URL+path)
    },
    get:(path,config)=>{
        return fetch(BASE_URL+path)
    } 
} 

export default API;