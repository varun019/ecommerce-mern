import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(false);
  const [otp, setOtp] = useState<string>("");

  useEffect(() => {
    if (localStorage.user) {
      navigate("/product");
    }
  }, []);

  const countDown = () => {
    let seconds = 59;

    function tick() {
      const counters = document.getElementById("counter1");
      seconds--;
      if (counters) {
        counters.innerHTML =
          " Your OTP expired in 0:" + (seconds < 10 ? "0" : "") + String(seconds);
      }
      if (seconds > 0) {
        setTimeout(tick, 1000);
      } else {
        const counter = document.getElementById("counter");
        if (counter) {
          counter.innerHTML = "";
        }
      }
      if (seconds === 1) {
        setTimer(true);
      }
    }

    tick();
  };

  const login = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!password || !email) {
      setError(true);
      return false;
    } else {
      try {
        const userData = await axios.post('http://localhost:8080/login', {
          username: email,
          email: email,
          password: password,
        });
        console.log(userData);
        
        const data = await userData.data;
        console.log(data);
        
        if (data.isActive === true && data.role === "user") {
          if (data.isOtpSend === true) {
            setShow(true);
            countDown();
          } else {
            navigate("/product");
            localStorage.setItem("user", JSON.stringify(data));
          }
        } else {
          if (data.message) {
            toast(data.message);
          } else {
            toast.error(
              "Your account has been blocked by admin, please contact admin or check email and password again"
            );
          }
        }
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    }
  };

  const OTPVerification = async () => {
    if (!otp) {
      setError(true);
    } else {
      const verifyOTP = await axios.post(
        "http://localhost:8080/OTPverification",
        {
          email: email,
          otp: otp,
        }
      );

      if (verifyOTP.data === "OTP is invalid") {
        toast.error("OTP is invalid");
      } else {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your verification has been successful",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/product");
        localStorage.setItem("user", JSON.stringify(verifyOTP.data));
      }
    }
  };

  const resendOTP = async () => {
    const resendOTP = await axios.post(`http://localhost:8080/resendOTP`, {
      email: email,
    });

    if (resendOTP) {
      toast.success("OTP sent successfully");
      countDown();
    }
  };

  return (
    <div className="login-sign ">
      <div className="my-2 ">
        <form className="form">
          {show ? (
            <>
              <div>
                <h1>Enter Your OTP</h1>
                <input
                  type="text"
                  placeholder="Enter your OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
                {error && !otp && (
                  <span className="invalid-input">Enter OTP</span>
                )}
                <br />
                {!timer ? (
                  <>
                    <Button
                      className="confirm"
                      onClick={() => OTPVerification()}
                    >
                      Confirm
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="confirm mx-4"
                      onClick={() => resendOTP()}
                    >
                      Resend OTP
                    </Button>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <h3>Login</h3>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"></label>
                <input type="email" className="form-control inputs" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} placeholder="Email address or username" />
              </div>
              {error && !email && (
                <span className="invalid-input">Enter email</span>
              )}
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label "></label>
                <input type="password" className="form-control inputs2" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
              </div>
              {error && !password && (
                <span className="invalid-input">Enter password</span>
              )}
              <button type="submit" className="btn btn-outline-primary mt-3 sub" onClick={login}>
                Login
              </button>
              <NavLink
               to="/setNewPassword"
               className='forgetpassword'
              >
                Forget password
              </NavLink>
              <NavLink to='/signup'><p className="para">Not a Member?</p></NavLink>              
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
