import {Link} from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../components/Slider'

function Explore() {
  return (
  <div className='explore'>
    <header>
      <p className='pageHeader'>物件を探す</p>
    </header>

    <main>
      {/* Slider */}
      <Slider />

      <p className="exploreCategoryHeading">カテゴリー</p>
      <div className="exploreCategories">
        <Link to='/category/rent'>
          <img src={rentCategoryImage} alt="rent" className='exploreCategoryImg'/>
          <p className="exploreCategoryName">賃貸物件</p>
        </Link>
        <Link to='/category/sale'>
          <img src={sellCategoryImage} alt="sale" className='exploreCategoryImg'/>
          <p className="exploreCategoryName">売買物件</p>
        </Link>
      </div>
    </main>
  </div>
  )
}

export default Explore