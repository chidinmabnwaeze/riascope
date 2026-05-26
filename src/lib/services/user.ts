import api from "$lib/api"
import {type PatientInfo } from "$lib/types";

export const userService = {
createUser : async(data:PatientInfo)=>{
    const response = await api.post("/users", data)
    return response;
},
getUser: async()=>{
    const response = await api.get("/users")
    return response;
},
getUserById: async(id: number)=>{
    const response = await api.get(`/users/${id}`)
    return response;
}
}