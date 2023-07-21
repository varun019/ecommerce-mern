import { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';

function SetNewPassword() {
  const [email, setEmail] = useState<string | undefined>();
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const getLink = async () => {
    if (!email) {
      setError(true);
    } else {
      try {
        const res = await axios.post('http://localhost:8080/resetPassword', {
          email: email
        });

        if (res.data.data) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Email sent successfully. Please check your email.",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate('/login');
        } else {
          toast.success('Email sent successfully. Please check your email');
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <div className='reset'>
      <h3>Reset Your Password</h3>
      <div className='my-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Enter your Email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {error && !email && <span className='invalid-input'>Enter email</span>}



        <button className='btn btn-outline-success my-3' onClick={getLink}>
          Get Link
        </button>
        {/* <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div> */}
      </div>
    </div>



  )
}

export default SetNewPassword;
