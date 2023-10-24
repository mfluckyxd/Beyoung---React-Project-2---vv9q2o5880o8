import axios from "axios"
import { headerWithProjectIdOnly, apiURL } from "./getHeaders";



export const getProductsBySearch = async (filter)=>{
    const headers = headerWithProjectIdOnly()

    function isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
      }

    let searchFilter = ''
    if ((filter && !isObjectEmpty(filter))) {
        searchFilter = `&search=${(JSON.stringify(filter))}`
    }


    try {
        // console.log(`${apiURL}/ecommerce/clothes/products?limit=${20}&page=${page}${searchFilter}`)
        const res = await axios.get(
            `${apiURL}/ecommerce/clothes/products?limit=${200}${searchFilter}`,
            headers   
        );

        return res.data
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