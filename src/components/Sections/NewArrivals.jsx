import React from 'react'
import SectionsHeading from './SectionsHeading/SectionsHeading'
import Card from '../Card/Card'
import Jeans from '../../assets/img/jeans.jpg'
import Shirt from '../../assets/img/shirts.jpg'
import TShirt from '../../assets/img/tshirts.jpeg'
import Dresses from '../../assets/img/dresses.jpg'
import Kurtis from '../../assets/img/kurtis.jpg'
import Jogger from '../../assets/img/joggers.jpg'
import Carousel from 'react-multi-carousel';
import { responsive } from '../../utils/Section.constants';
import './NewArrivals.css';
const items = [{
    'title' : 'Jeans',
    imagePath:Jeans
},{
    'title' : 'Shirt',
    imagePath:Shirt
},{
    'title' : 'T-Shirt',
    imagePath:TShirt
},{
    'title' : 'Dresses',
    imagePath:Dresses
},
{
    'title' : 'Kurti',
    imagePath:Kurtis
},
{
    'title' : 'Jogger',
    imagePath:Jogger
}
]
const NewArrivals = () => {
  return (
    <>
    <SectionsHeading title={'New Arrivals'} />
     <Carousel
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={false}
        showDots={false}
        infinite={false}
        partialVisible={false}
        itemClass={'react-slider-custom-item'}
        className='px-8'
      >
        {items && items?.map((item,index)=> <Card key={item?.title +index} title={item.title} imagePath={item.imagePath}/>)}

      </Carousel>
    </>
  )
}

export default NewArrivals
