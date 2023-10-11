import React from 'react'
import shirts from '../../assets/Shirts.jpg'
import jeans from '../../assets/Jeans.jpg'
import joggers from '../../assets/Joggers.jpg'
import { Link } from 'react-router-dom'


const Categories = () => {
  return (
    <div className='categories-container'>
        <h3>Categories</h3>
        <section className="categories-cards-section">
            <Link className="category-card"><img src={shirts} alt="shirts" /></Link>
            <Link className="category-card"><img src={jeans} alt="jeans" /></Link>
            <Link className="category-card"><img src={joggers} alt="joggers" /></Link>
            
            
            
        </section>

    </div>
  )
}

export default Categories