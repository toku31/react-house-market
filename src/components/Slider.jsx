import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {collection, getDocs, query, orderBy, limit} from 'firebase/firestore'
import {db} from '../firebase.config'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from '../components/Spinner'
 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';


function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(()=> {

    const fetchListings = async() => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)
      
      let listings = []

      querySnap.forEach((doc)=> {
        return listings.push(
          {
            id: doc.id,
            data: doc.data()
          }
        )
      })

      console.log('explore listings', listings)
      setListings(listings)
      setLoading(false)
    }

    fetchListings()
    
  }, [])

  if(loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return  <></>
  }


  return (
    <>
      <p className="exploreHeading">おすすめ物件</p>
      <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      style={{ height: '300px' }}
      >
      {listings.map(({data, id}) => (
        <SwiperSlide key={id} onClick={()=>navigate(`/category/${data.type}/${id}`)}>
          <div
              className='swiperSlideDiv'
              style={{
                  background: `url(${data.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
              }}
          >
            <p className="swiperSlideText">{data.name}</p>
            <p className="swiperSlidePrice">
              ￥{data.discountedPrice ?? data.regularPrice}{' '}{data.type==='rent' && '/ 月'}
            </p>
          </div>
        </SwiperSlide>
      )
      )}
    </Swiper>
    </>
  )
}

export default Slider