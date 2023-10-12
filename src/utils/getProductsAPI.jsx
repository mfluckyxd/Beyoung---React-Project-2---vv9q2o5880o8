import axios from "axios"
import { headerWithProjectIdOnly } from "./getHeaders";

const apiURL = 'https://academics.newtonschool.co/api/v1/'


export const getProductsBySearch = async (page, filter)=>{
    const headers = headerWithProjectIdOnly()

    let searchFilter = ''
    if (filter) {
        searchFilter = `&filter=${JSON.stringify(filter)}`
    }


    try {
        const res = await axios.get(
            `${apiURL}/ecommerce/clothes/products?limit=${20}&page=${page}${searchFilter}`,
            headers   
        );

        return res.data.data
    } catch (error) {
        return error
    } 
}

export const getProductById = async (id)=>{
    const headers = headerWithProjectIdOnly()
    try {
        const res = await axios.get(
            `${apiURL}/ecommerce/product/${id}`,
            headers
        )
       return res.data.data
        
    } catch (error) {
        return error
    }
}