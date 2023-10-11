import axios from "axios"
import { headerWithProjectIdOnly } from "./getHeaders";

const apiURL = 'https://academics.newtonschool.co/api/v1/'


export const getProductsBySearch = async (searchField, searchTerm)=>{
    const headers = headerWithProjectIdOnly()
    try {
        const res = await axios.get(
            `${apiURL}/ecommerce/clothes/products?search={"${searchField}":"${searchTerm}"}`,
            headers   
        );

        return res.data.data
    } catch (error) {
        return error
    } 
}

export const getAllProductsByLimit = async (limit)=>{
    const headers = headerWithProjectIdOnly()
    try {
        const res = await axios.get(
            `${apiURL}/ecommerce/clothes/products?limit=${limit}`,
            headers
        )
        res.data.data.map((product)=>{
            // console.log(product.category!=='clothes');
            if (product.subCategory!=='jogger'&&product.subCategory!=='jeans'&&product.subCategory!=='shirt') {
                console.log(product.subCategory);
            }
            
        })
        // console.log(res.data.data)
    } catch (error) {
        return error
    }
}