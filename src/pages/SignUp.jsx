import {useState} from 'react'
import { useNavigate, Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {db} from '../firebase.config'
import { ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth';


function SignUp() {
  const  [showPassword, setShowPassword] = useState(false)
  const  [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  }) 

  const {name, email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      // console.log(error)
      toast.error('Something went wrong with registration')
    }
  }

  return (
  <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">ようこそ！</p>
        {/* <p className="pageHeader">Welcome Back!</p> */}
      </header>

      <form onSubmit={onSubmit}>
        <input type="text" className='nameInput' placeholder='名前' 
          id="name" value={name} onChange={onChange} />

        <input type="email" className='emailInput' placeholder='メールアドレス' 
          id="email" value={email} onChange={onChange} />

        <div className="passwordInputDiv">
          <input type={showPassword ? 'text' : 'password'} className="passwordInput"
            placeholder='メールアドレス(確認)' id='password' value={password} onChange={onChange} />
          <img src={visibilityIcon} alt="show password" className='showPassword'
             onClick={() => setShowPassword((prevState) => (!prevState))} />
        </div>


        <Link to='/forgot-password' className='forgotPasswordLink'>パスワードを忘れましたか</Link>

        <div className="signUpBar">
          <p className="signUpText">サインアップ</p>
          <button className="signUpButton">
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
          </button>
        </div>
      </form>

      <OAuth />

      <Link to='/sign-in' className='registerLink'>サインインする</Link>
      {/* <Link to='/sign-in' className='registerLink'>Sign In Instead</Link> */}
    </div>
  </>
  )
}

export default SignUp