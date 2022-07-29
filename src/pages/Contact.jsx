import {useState, useEffect} from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast } from 'react-toastify'

function Contact() {

  const [message, setMessage] = useState('')
  const [landlord, setLandlord] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useParams()

  useEffect(() => {
    const getLandlord = async() => {
      // console.log('landlordId', params.landlordId)
      const docRef = doc(db, 'users', params.landlordId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log('docSnap.data:', docSnap.data())
        setLandlord(docSnap.data())
      } else {
        toast.error('Could not get landlord data')
      }
    }

    getLandlord()
  }, [params.landlordId])

  const onChange = (e) => setMessage(e.target.value)


  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>家主に問い合わせ</p>
      </header>

      {landlord != null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">
              Contact {landlord?.name}
            </p>
          </div>

          <form action="" className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                メッセージ
              </label>
              <textarea name="message" id="message" className='textarea' value={message} onChange={onChange}></textarea>
            </div>

            <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
              <button type="button" className="primaryButton">送信</button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact