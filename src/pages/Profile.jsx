import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import {updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from '../components/ListingItem'


function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)

  // const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const {name, email} = formData 

  const navigate = useNavigate()

  useEffect(()=> {
    // console.log('profile', auth.currentUser)
    const fetchUserListings = async() => {
      const listingsRef = collection(db, 'listings')
      // console.log('profile listingsRef', listingsRef)
      // console.log('profile', auth.currentUser.uid)
      const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))

      const querySnap = await getDocs(q)
      // console.log('profile querySnap', querySnap)
      let listings = []
      querySnap.forEach((doc)=> {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      // console.log(listings)
        setListings(listings)
        setLoading(false)
    }

    fetchUserListings()
    console.log('profile listings', listings)

  }, [auth.currentUser.uid])

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async() => {
    console.log(123)
    try {
      // Update display name on fb
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })
      }

      // Update in firestore
      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, {
        name
      })
    
    } catch(error) {
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onDelete = async (listingId) => {
    if(window.confirm('Are you sure you want to delete?')){
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)
 
  // useEffect(() => {
  //   console.log('profile', auth.currentUser)
  //   setUser(auth.currentUser)
  // }, [])
  // return user ? <h1>{user.displayName}</h1> : 'Not Logged In' 

  return <div className='profile'>
    <header className='profileHeader'>
      <p className="pageHeader">プロフィール</p>
      <button type="button" className="logOut" onClick={onLogout}>
        ログアウト
      </button>
    </header>

    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText">個人情報</p>
        <p className="changePersonalDetails" onClick={() => {
          changeDetails && onSubmit()
          setChangeDetails((prevState) => (!prevState))
        }}>
          {changeDetails ? '更新' : '変更'}
        </p>
      </div>

      <div className="profileCard">
        <form>
          <input type="text" id="name" 
          className={!changeDetails ? 'profileName' : 'profileNameActive'}
          disabled={!changeDetails}
          value={name}
          onChange={onChange}
          />

          <input type="text" id="email" 
          className={!changeDetails ? 'profileName' : 'profileNameActive'}
          disabled={!changeDetails}
          value={email}
          onChange={onChange}
          />
        </form>
      </div>
      <Link to='/create-listing' className='createListing'>
        <img src={homeIcon} alt="home" />
        <p>あなたの家を貸す/売る</p>
        <img src={arrowRight} alt="arrow right" />
      </Link>

      {! loading && listings?.length > 0 && (
        <>
          <p className="listingText">作成済みリスト </p>
          <ul className="listingsList">
            {listings.map((listing) => (
              <ListingItem key={listing.id} listing={listing.data} 
              id={listing.id} onDelete={()=> onDelete(listing.id)}
              onEdit={()=> onEdit(listing.id)} />
            )
            )}
          </ul>
        </>
      )}
    </main>
  </div> 
}

export default Profile