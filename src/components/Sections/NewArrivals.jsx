import React from 'react'
import SectionHeading  from './SectionsHeading/SectionsHeading'
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
    imagePath:Jeans,
    'categoryType':"ce4ef1f7-208f-42a2-b980-094064c34ccb"
},{
    'title' : 'Shirt',
    imagePath:Shirt,
    'categoryType':"b7f15f99-74f6-41ed-af25-bc28db8d1a22"
},{
    'title' : 'T-Shirt',
    imagePath:TShirt,
    'categoryType':"86852af3-5da2-4d2e-a139-96c1ea02aeff"
},{
    'title' : 'Dresses',
    imagePath:Dresses,
    'categoryType':"c4c23b77-df0e-42ae-b681-3c4e948dceca"
},
{
    'title' : 'Kurti',
    imagePath:Kurtis,
    'categoryType':"a863ecb2-2ab1-41cf-b7ad-d7883f2aa64e"
},
{
    'title' : 'Jogger',
    imagePath:Jogger,
    'categoryType':"ce4ef1f7-208f-42a2-b980-094064c34ccb"
}
]
const NewArrivals = () => {
  return (
    <>
      <SectionHeading title={'New Arrivals'} />
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
        {items && items?.map((item, index) => (
          <Card 
            key={item?.title + index} 
            title={item.title} 
            imagePath={item.imagePath}
            categoryType={item.categoryType} // Pass categoryType prop
          />
        ))}
      </Carousel>
    </>
  )
}

export default NewArrivals;
