import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';

function SignupNew() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<boolean>(false);

  const signup = async () => {
    if (!email || !password || !username || !photo) {
      setError(true);
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "user");
      formData.append("isActive", 'true');
      formData.append("isOtpSend", 'true');
      formData.append("image", photo);
      try {

        let sign = await axios.post('http://localhost:8080/signup', formData)
        // console.log(sign.data);

        if (sign.data.message === "success") {
          toast.success('Registration Successful!', { position: toast.POSITION.TOP_CENTER, className: 'toast-message' })
          navigate('/login')
        } else {
          console.log("failed");
        }
      } catch (error) {
        console.log(error);
      }

    }
  }

  return (
    <Wrapper>
      <div className='' style={{ border: 'none' }}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black reg-info">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <h1 className="h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</h1>

                      <form className="mx-1 mx-md-4" >

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw icons"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control fw-bold" placeholder="Your Name" onChange={(e) => setUsername(e.target.value)} />
                            {error && !username && <span className='invalid-input' >Enter Username{error}</span>}

                            <label className="form-label" htmlFor="form3Example1c" ></label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw icons"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control fw-bold" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} />
                            {error && !email && <span className='invalid-input' >Enter email{error}</span>}
                            <label className="form-label" htmlFor="form3Example3c" ></label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw icons"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control fw-bold" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            {error && !password && <span className='invalid-input' >Enter password{error}</span>}
                            <label className="form-label" htmlFor="form3Example4c" ></label>
                          </div>
                        </div>

                        <Form.Group controlId="formFile" className="inputBox">
                          <label htmlFor='photo' className='photo-up'>Upload Photo</label>
                          <Form.Control type="file" className='file' onChange={(e) => { setPhoto(e.target.files[0])}} ></Form.Control>
                          {error && !photo && <span className='invalid-input' >Enter Photo{error}</span>}
                        </Form.Group>

                        <div className="mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg btn-reg" onClick={signup}>Register</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="images/register.webp"
                        className="img-fluid" alt="Sample image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.icons:before {
  font-size: 18px;
}
.check{
  width: 22px;
  height: 20px;
  margin-right: 8px;
}
.reg-info{
  border:none;
}
.toast-message{
  font-size:medium;
}
input{
  height: 44px;
  font-size: 14px;
  border: 0;
  border-bottom: 2px solid;
  border-radius: 0;
}
.check-field{
  position: relative;
  margin-left: -120px;
}
p{
  color:red;
}
.btn-reg{
  font-size: medium;
  font-weight: bold;
}

`
export default SignupNew;
