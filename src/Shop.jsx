import HeroSection from './components/HeroSection/HeroSection';
import Navigation from './components/Navigation/Navigation';
import NewArrivals from './components/Sections/NewArrivals';
import logo from './logo.svg';
import content from './data/content.json'
import Category from './components/Sections/Categories/Category';
import Footer from './components/Footer/Footer';
const Shop = ()=>{
  return(
    <>
      <HeroSection/>
      <NewArrivals/>
       {content?.categories &&
    content.categories.map((item, index) => (
      <Category key={item?.title + index} {...item} />
    ))}
   <Footer content={content?.footer}/>
    </>
  )
}

export default Shop;
