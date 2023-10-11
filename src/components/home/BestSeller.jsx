import React, { useEffect, useState } from 'react'
import ProductSlider from './product_card/ProductSlider';

const BestSeller = () => {
    const [products, setProducts] = useState([]);
  

    const fetchProducts = async () => {
      setProducts([
        {
          seller: {
            name: "Bewakoof®",
          },
          type: null,
          size: null,
          _id: "652675ccdaf00355a78380f2",
          name: "Men's Black Oversized Plus Size Shirt",
          description:
            'Ideal for music festivals, outdoor BBQs, or just lounging like a pro, this Men\'s Black Oversized Plus Size Shirt is your fashion BFF. Pair with your go-to sneakers and jeans for a cool look!<br><b style="font-family: montserrat-bold, sans-serif"> Country of Origin - </b>India<br><br><b style="font-family: montserrat-bold, sans-serif"> Manufactured By - </b>Bewakoof Brands Pvt Ltd, Sairaj logistic hub #A5,BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302<br><br><b style="font-family: montserrat-bold, sans-serif"> Packed By - </b>Bewakoof Brands Pvt Ltd, Sairaj logistic hub #A5,BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302<br><br><b style="font-family: montserrat-bold, sans-serif"> Commodity - </b>Men\'s Shirt<br>',
          price: 1099,
          fabric: null,
          brand: "Bewakoof®",
          category: "clothes",
          subCategory: "shirt",
          features: [],
          videos: [],
          theme: null,
          sellerTag: "new arrival",
          color: "BLACK",
          gender: "Men",
          displayImage:
            "https://images.bewakoof.com/t1080/men-s-black-oversized-plus-size-shirt-586189-1695998439-1.jpg",
          ratings: 0,
        },
        {
          seller: {
            name: "Bewakoof®",
          },
          type: null,
          size: null,
          _id: "652675ccdaf00355a78380f5",
          name: "Men's Brown Oversized Shirt",
          description:
            'Stay fashion-forward with this Men\'s Brown Oversized Shirt. Team it up with denim and sneakers for a casual look.<br><b style="font-family: montserrat-bold, sans-serif"> Country of Origin - </b>India<br><br><b style="font-family: montserrat-bold, sans-serif"> Manufactured By - </b>Bewakoof Brands Pvt Ltd, Sairaj logistic hub #A5,BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302<br><br><b style="font-family: montserrat-bold, sans-serif"> Packed By - </b>Bewakoof Brands Pvt Ltd, Sairaj logistic hub #A5,BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302<br><br><b style="font-family: montserrat-bold, sans-serif"> Commodity - </b>Men\'s Shirt<br>',
          price: 899,
          fabric: null,
          brand: "Bewakoof®",
          category: "clothes",
          subCategory: "shirt",
          features: [],
          videos: [],
          theme: null,
          sellerTag: "new arrival",
          color: "BROWN",
          gender: "Men",
          displayImage:
            "https://images.bewakoof.com/t1080/men-s-brown-oversized-shirt-586225-1696418725-1.jpg",
          ratings: 0,
        },
        {
          seller: {
            name: "Bewakoof®",
          },
          type: null,
          size: null,
          _id: "652675cddaf00355a7838107",
          name: "Men's White & Blue Tie & Dye Oversized Shirt",
          description:
            'This Tie & Dye Men\'s White & Blue Oversized Shirt is perfect for a laid-back yet striking look. Pair it with denim and sneakers for a casual look.<br><b style="font-family: montserrat-bold, sans-serif"> Country of Origin - </b>India<br><br><b style="font-family: montserrat-bold, sans-serif"> Manufactured By - </b>Bewakoof Brands Pvt Ltd, Sairaj logistic hub #A5,BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302<br><br><b style="font-family: montserrat-bold, sans-serif"> Packed By - </b>Bewakoof Brands Pvt Ltd, Sairaj logistic hub #A5,BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302<br><br><b style="font-family: montserrat-bold, sans-serif"> Commodity - </b>Men\'s Shirt<br>',
          price: 899,
          fabric: null,
          brand: "Bewakoof®",
          category: "clothes",
          subCategory: "shirt",
          features: [],
          videos: [],
          theme: null,
          sellerTag: "new arrival",
          color: "WHITE",
          gender: "Men",
          displayImage:
            "https://images.bewakoof.com/t1080/men-oversize-tie-dye-shirt-33-586221-1693910906-1.jpg",
          ratings: 0,
        },
        {
          seller: {
            name: "Bewakoof®",
          },
          type: null,
          size: null,
          _id: "652675cddaf00355a783810a",
          name: "Men's White & Black All Over Printed Oversized Shirt",
          description:
            'Dive into dynamic style with this All Over Printed Men\'s White & Black Oversized Shirt. Style it with cargo pants and sneakers for a party look.<br><b style="font-family: montserrat-bold, sans-serif"> Country of Origin - </b>India<br><br><b style="font-family: montserrat-bold, sans-serif"> Manufactured By - </b>Bewakoof Brands Pvt Ltd, Sairaj logistic hub #A5,BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302<br><br><b style="font-family: montserrat-bold, sans-serif"> Packed By - </b>Bewakoof Brands Pvt Ltd, Sairaj logistic hub #A5,BMC pipeline road, Opposite all saints high school, Amane, Bhiwandi, Thane, Maharashtra 421302<br><br><b style="font-family: montserrat-bold, sans-serif"> Commodity - </b>Men\'s Shirt<br>',
          price: 999,
          fabric: null,
          brand: "OFFICIAL GARFIELD MERCHANDISE",
          category: "clothes",
          subCategory: "shirt",
          features: [],
          videos: [],
          theme: null,
          sellerTag: "new arrival",
          color: "WHITE",
          gender: "Men",
          displayImage:
            "https://images.bewakoof.com/t1080/men-oversize-aop-shirt-23-586209-1693911106-1.jpg",
          ratings: 0,
        },
        {
          seller: {
            name: "Bewakoof®",
          },
          type: null,
          size: null,
          _id: "652675cddaf00355a7838121",
          name: "Men's Grey Cursed Sasuke Graphic Printed Oversized Shirt",
          description:
            "Unleash your inner Uchiha with our Cursed Sasuke Graphic Printed Men's Grey Oversized Shirt! This shirt is as broodingly stylish as the legendary Sasuke himself. Crafted from premium cotton, it's softer than a Shuriken's edge and more comfortable than Tsunade's pillow.<br><br>The oversized fit is perfect for channeling your inner ninja - roomy, relaxed, and ready for any mission. Whether you're out on a quest or just lazing at Ichiraku Ramen, you'll be comfortable and cool.<br><br>The shade of grey? It's as enigmatic as Sasuke's past, adding a dash of intrigue to your ensemble. Styling tip? Pair it with black jeans and your favorite Sharingan-themed sneakers for a look that screams, \"I'm on a mission, but make it fashion.\" Grab this shirt, and let your inner Sasuke shine!<br><br>Treat it like a precious Jutsu scroll - machine wash gently in cold water and hang dry in the shade to preserve the ninja magic.<br><br>Get your ninja avatar on with this Official Naruto grey oversized T-shirt. Shop on Bewakoof & uplevel your ninja skills.<br><br><b style=\"font-family: montserrat-bold, sans-serif\"> Country of Origin - </b>India<br><br><b style=\"font-family: montserrat-bold, sans-serif\"> Manufactured By - </b>Bewakoof Brands Pvt Ltd, Sairaj Logistic Hub #A5, Bmc Pipeline Road, Opposite All Saints High School, Amane, Bhiwandi, Thane, Maharashtra 421302<br><br><b style=\"font-family: montserrat-bold, sans-serif\"> Packed By - </b>Bewakoof Brands Pvt Ltd, Sairaj Logistic Hub #A5, Bmc Pipeline Road, Opposite All Saints High School, Amane, Bhiwandi, Thane, Maharashtra 421302<br><br><b style=\"font-family: montserrat-bold, sans-serif\"> Commodity - </b>Men's Shirt<br>",
          price: 999,
          fabric: null,
          brand: "OFFICIAL NARUTO MERCHANDISE",
          category: "clothes",
          subCategory: "shirt",
          features: [],
          videos: [],
          theme: null,
          sellerTag: "new arrival",
          color: "GREY",
          gender: "Men",
          displayImage:
            "https://images.bewakoof.com/t1080/men-s-cursed-sasuke-grey-graphic-printed-oversized-shirt-620484-1695804462-1.jpg",
          ratings: 0,
        },
      ]);
      try {
        //   const res = await getProductsBySearch("sellerTag", "best seller");
        //   setProducts(res);
        //   console.log(res);
      } catch (error) {}
    };
  
    useEffect(() => {
      fetchProducts();
      
    }, []);
  return (
    <div className='best-seller-container'>
        <ProductSlider products={products} heading={'best seller'}/>
    </div>
  )
}

export default BestSeller