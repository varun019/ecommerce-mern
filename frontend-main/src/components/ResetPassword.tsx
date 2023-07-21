import { useState } from 'react';
import queryString from "query-string";
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';

function ResetPassword() {
  const { search } = useLocation();
  const { token } = queryString.parse(search) as { token: string };
  const [error, setError] = useState<boolean>(false);
  const [password, setPassword] = useState<string | undefined>();
  const [tokenVerify, setTokenVerify] = useState<boolean | undefined>(true);
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false); // New loading state
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!password || !confirmPassword) {
      setError(true);
    } else {
      if (password === confirmPassword) {
        setLoading(true); // Start the loading state
        try {
          let result = await axios.post(`http://localhost:8080/resetPassword/${token}`, {
            password: password
          });
          if (result.data) {
            toast.success("Success!");
            navigate('/login');
          }
        } catch (error) {
          toast.error('Something went wrong. Please try again later.');
        }
        setLoading(false); // Stop the loading state
      } else {
        toast.error('Passwords do not match');
      }
    }
  }

  return (
    <div className='reset'>
      {tokenVerify ? (
        <>
          <h3>Reset Your Password</h3>
          <div className='my-3'>
            <input type="password" placeholder='Enter new password' className='inputfield' onChange={(e) => setPassword(e.target.value)} />
            {error && !password && <span className='invalid-input'>Enter New password</span>}
            <input type="password" placeholder='Confirm your new password' className='inputfield' onChange={(e) => setConfirmPassword(e.target.value)} />
            {error && !confirmPassword && <span className='invalid-input'>Enter confirm Password</span>}
            <button className="btn btn-outline-primary my-3" onClick={() => onSubmit()} disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Confirm'
              )}
            </button>
          </div>
        </>
      ) : (
        <>
          {
            toast.error("Something went wrong. Please try again later.")
          }
        </>
      )}
    </div>
  );
}

export default ResetPassword;
