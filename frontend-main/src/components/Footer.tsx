import React from 'react';
// import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaDiscord, FaInstagram, FaFacebookSquare, FaYoutube } from "react-icons/fa";
// import { Button } from './Button';

export const Footer: React.FC = () => {
    return (
        <>
            <Wrapper>
                {/* <section className='contact-short'>
                    <div className='grid grid-two-column'>
                        <div>
                            <h3 className='text-dark'>Let's Get Started!!</h3>
                            <h3 className='text-dark'>How Can We Help you today</h3>
                        </div>
                        <div>
                            <button type="button" className="btn btn-outline-success">
                                <NavLink to='/contact'>Get Started</NavLink>
                            </button>
                        </div>
                    </div>
                </section> */}

                <footer>
                    <div className='container'>
                        <div className="row">
                            <div className='col-sm-6'>
                                <div className='footer-about text-start'>
                                    <h3 className='mb-4'>TechnoKart E-commerce</h3>
                                    <p style={{ maxWidth: '300px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, soluta.</p>
                                    <p>Contact us : +91 216731523</p>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className='footer-social text-end'>
                                    <h3 className='mb-4'>Follow us</h3>
                                    <div className='footer-social-icon d-flex justify-content-end gap-3'>
                                        <div>
                                            <FaDiscord className='icon fa-3x my-1' style={{ width: "30px", height: '30px' }} />
                                        </div>
                                        <div>
                                            <FaInstagram className='icon fa-3x my-1' style={{ width: "30px", height: '30px' }} />
                                        </div>
                                        <div>
                                            <FaFacebookSquare className='icon fa-3x my-1' style={{ width: "30px", height: '30px' }} />
                                        </div>
                                        <div>
                                            <FaYoutube className='icon fa-3x my-1' style={{ width: "30px", height: '30px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom--section pb-4">
                        <hr />
                        <div className="container grid grid-two-column">
                            <p>@{new Date().getFullYear()} TechnoKart &copy; All Rights Reserved.</p>
                            <div>
                                <p>PRIVACY POLICY</p>
                                <p className='mb-0'>TERMS & CONDITIONS</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
  .contact-short {
    max-width: 60vw;
    margin: auto;
    padding: 3rem 9rem;
    background:rgb(236 237 239);
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(50%);

    .grid div:last-child {
      justify-self: end;
      align-self: center;
    }
  }

  .btn {
    font-size: small;
    display: flex;
    margin-top: 10px;
    padding: 10px;
    font-weight: bold;
    background-color: #e81c25;
    color: white;
  }

  input::placeholder {
    font-weight: bold;
  }

  footer {
    padding-top: 3rem;
    background: #081432;
    color: white;

    h3 {
      color: ${({ theme }) => theme.colors.hr};
      margin-bottom: 2.4rem;
    }

    p {
      color: ${({ theme }) => theme.colors.white};
    }

    .footer-social--icons {
      display: flex;
      gap: 2rem;

      input[type='email'] {
        height: 55px;
        width: auto;
      }

      input[type='submit'] {
        height: 55px;
        width: auto;
      }
    }
  }

  .footer-bottom--section {

    hr {
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.hr};
      height: 0.1px;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .contact-short {
      max-width: 80vw;
      margin: 4.8rem auto;
      transform: translateY(0%);
      text-align: center;

      .grid div:last-child {
        justify-self: center;
      }
    }

    @media screen and (max-width:576px){
      .btn{
          margin-right:80px;
      }
    }

    @media screen and (max-width:768px){
      .btn{
          margin-right:80px;
      }
    }

    @media screen and (max-width:992px){
      .btn{
          margin-right:80px;
      }
    }

    footer {
      padding: 9rem 0 9rem 0;
    }

    .footer-bottom--section {
      padding-top: 4.8rem;
    }
  }
`;


