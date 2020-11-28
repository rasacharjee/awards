import React from 'react'
import './Home.css'
import bg from './backgroundHome.jpg'
import Product from './Product'
import flipkart from './flipkartGift.jpg'
import pantaloons from './pantaloons_gift.jpg'
import digital from './relianceGift.png'
import spotify from './spotifyGift.png'
import bbq from './bbqGift.jpeg'
import amex from './amexGift.png'
import myntra from './myntraGift.jpeg'

function Home() {
    return (
        <div className='home'>
            <div className="home_container">
            <img className="home_image" src={bg} alt=""/>
            <div className="home_row">
                <Product title="Flipkart Gift Card" image={flipkart} price={1000} rating={5}/>
                <Product title="Digital Gift Card" image={digital} price={500} rating={3}/>
            </div>
            <div className="home_row">
                <Product title="Pantaloons Gift Card" image={pantaloons} price={500} rating={5}/>
                <Product title="Spotify Gift Card" image={spotify} price={500} rating={2}/>
                <Product title="Barbeque Gift Card" image={bbq} price={500} rating={5}/>
            </div>
            <div className="home_row">
            <Product title="Myntra Gift Card" image={myntra} price={500} rating={3}/>
            <Product title="AMEx Gift Card" image={amex} price={500} rating={5}/>
            </div>
            </div>
        </div>
    )
}

export default Home
