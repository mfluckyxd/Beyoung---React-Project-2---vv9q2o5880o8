import React from 'react'

const SingleProductCard = ({product}) => {
    const { name, price, _id, displayImage} = product
    
  return (
    <div className='product-card' id={_id}>
        <img src={displayImage} style={{width:'100%'}} alt={name} />
        <p>{name}</p>
        <p>&#8377;{price}</p>

    </div>
  )
}

export default SingleProductCard