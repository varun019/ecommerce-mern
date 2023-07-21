import axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

interface User {
  email: string;
  username: string;
  image: string;
  isOtpSend: boolean;
}

function Profile() {
  const navigate = useNavigate();
  let user : any = localStorage.getItem('user');
  user = JSON.parse(user!) as User;
  console.log(user);
  
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState(false);
  const [oldPassword, setOldPassword] = useState<string | undefined>();
  const [newPassword, setNewPassword] = useState<string | undefined>();

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      setError(true);
    } else {
      let result = await axios.put(`http://localhost:8080/changePassword`, {
        email: user.email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
      if (result.data.success) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Your password has been changed successfully',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/login');
      } else {
        alert(result.data.error);
      }
    }
  };

  const OTPVerification = async () => {
    let checkbox = document.getElementById('otpbtn') as HTMLInputElement;
    let updatedData = await axios.post('http://localhost:8080/isOtp', {
      email: user.email,
      isOtpSend: checkbox.checked,
    });
    localStorage.setItem('user', JSON.stringify(updatedData.data));
  };

  return (
    <div className="login">
      {!showInput ? (
        <>
        
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`http://localhost:8080/${user.image}`} />
            <ListGroup variant="flush">
              <ListGroup.Item>Name: {user.username}</ListGroup.Item>
              <ListGroup.Item>Email: {user.email}</ListGroup.Item>
              <button className="btn btn-info" onClick={() => setShowInput(true)}>
                Change Password
              </button>
            </ListGroup>
            <button className="btn btn-danger mx-3 my-3" id="otp">
              OTP verification
              <input
                type="checkbox"
                id="otpbtn"
                className="mx-3 px-4 py-4"
                defaultChecked={user.isOtpSend}
                onClick={() => OTPVerification()}
              ></input>
            </button>
          </Card>
        </>
      ) : (
        <div className="">
          <h1>Change Your Password</h1>
          <input
            type="password"
            className="form-control my-3"
            placeholder="Enter your old password"
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
          {error && !oldPassword && <span className="invalid-input">Enter your old password</span>}

          <input
            type="password"
            className="form-control my-3"
            placeholder="Enter your new password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          {error && !newPassword && <span className="invalid-input">Enter your new password</span>}
          <button className="btn btn-info" onClick={() => changePassword()}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
