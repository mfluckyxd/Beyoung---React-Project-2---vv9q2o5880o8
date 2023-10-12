import React from 'react'
import ProductSliderCard from '../home/product_card/ProductSliderCard'
import '../../styles/productlist.css'
import SingleProductCard from './SingleProductCard'


const ProductsListComponent = ({products}) => {


  return (
    <div className='products-list-compo-container'>
        <section className='product-list-filter-section'>
                gggg
        </section>
        <section className='product-list-section'>
          <h3>mens clothing</h3>
          <div className="product-list-cards-container">
            {products.map((product,i)=>(
              <ProductSliderCard key={i} product={product}/>
            ))}
          </div>
        
        </section>
    </div>
  )
}

export default ProductsListComponent