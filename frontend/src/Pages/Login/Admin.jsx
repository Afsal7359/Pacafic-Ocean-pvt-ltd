import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/pollogo.png'
import { AdminLogin } from '../../ApiCalls/Login';
import { toast } from 'react-toastify';
import bgimage from '../../assets/img/video/background.gif'

const Admin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const navigate = useNavigate()

    const togglePassword = () => {
        setShowPassword(!showPassword);
      };
      const handlesubmit=async(event)=>{
        event.preventDefault();
        try {
                const data ={
                    email:username,
                    password:password
                }
            const response = await AdminLogin(data);
            if(response.success){
                console.log(response,"res-suc");
                localStorage.setItem('admintoken',response.data);
                toast.success(`${response.message}`)
                // navigate('/')
                window.location.reload();
            }else{
                console.log(response,"res-err");
                toast.error(`${response.message}`)
            }
        } catch (error) {
            console.log(error);
            
        }
      }
  return (
    <>
  <div className="col-lg-10">
  <div className="login-wrapper">
    <div className="loginbox">
      <div className="login-right">
        <div className="login-right-wrap pb-5 pt-5"  style={{ 
       backgroundImage: `url(${bgimage})`, 
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat',
       minHeight: '100vh', 
       borderRadius:"45px"
     }}>
          <div className="account-logo">
            <a>
             <center><img src={logo} alt="" height={85}/></center> 
            </a>
           <center> <h2 className='mt-5'> Admin Login </h2></center>
          </div>
         
          {/* Form */}
          <form  onSubmit={handlesubmit}>
          <center> 
            <div className="form-group w-50">
              <label>
                Email <span className="login-danger">*</span>
              </label>
              <input className="form-control" type="text" onChange={(e) =>setUserName(e.target.value)} required/>
            </div>
            </center> 
            <center>
            <div className="form-group w-50">
              <label>
               Password <span className="login-danger">*</span> 
              </label>
              <input className="form-control pass-input" type={showPassword ? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)} required/>
              <span className="profile-views feather-eye-off toggle-password" onClick={togglePassword} />
            </div></center>
            <center>  <div className="form-group login-btn w-50">
              <button className="btn btn-primary btn-block" type="submit">
                Login
              </button>
            </div> </center> 
          </form>
           <p class="account-subtitle" style={{textAlign:"center"}}>If you are an User, <Link to={"/login"}>login</Link></p>
        
          
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Admin