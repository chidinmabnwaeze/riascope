import api from "$lib/api"
import {type PatientInfo } from "$lib/types";

export const analyseService = {
analyse: async(data:string)=>{
    const response = await api.post("/analyse", data)
    return response;
},
getanalysisByUserId: async(user_id: number)=>{
    const response = await api.get(`/analysis/${user_id}`)
    return response;
},
getAnalysisById: async(id: number)=>{
    const response = await api.get(`/analysis/id/${id}`)
    return response;
},
deleteAnalysisById: async(id: number)=>{
    const response = await api.delete(`/analysis/id/${id}`)
    return response;
}
}