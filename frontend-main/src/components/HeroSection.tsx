import { NavLink } from "react-router-dom";
import styled from "styled-components";
// import { Button } from "./Button";

const HeroSection = ({ mydata }: any) => {
  const { name } = mydata;

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data mb-5">
            <p className="intro-data">Welcome to </p>
            <h2 className=""> {name} </h2>
          </div>
          <div className="row align-items-center">
            <div className="col-sm-6 text-start">
              <p className="mb-4" style={{ fontSize: '18px', lineHeight: "32px" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore fugiat natus architecto laborum dignissimos earum ex commodi corporis in unde, eos magnam sint vitae sit voluptas ea, error est eveniet perferendis minima, doloribus culpa!
              </p>
              <NavLink to='/product' className="btn btn-outline-primary">
                Shop Now
              </NavLink>
            </div>
            <div className="col-sm-6">
              <img
                src="/images/hero.jpg"
                alt="hero-section-photo"
                className="img-style"
              />
            </div>
          </div>

          {/* <div className="hero-section-image">
            <p className="hero-para">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore fugiat natus architecto laborum dignissimos earum ex commodi corporis in unde, eos magnam sint vitae sit voluptas ea, error est eveniet perferendis minima, doloribus culpa!
            </p>
            <figure className="fig">
              <img
                src="/images/hero.jpg"
                alt="hero-section-photo"
                className="img-style"
              />
            </figure>
          </div> */}
          {/* <NavLink to='/product'>
            <button className="btn btn-outline-primary btn-shop">Shop Now</button>
          </NavLink> */}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .hero-section-data {
    p {
      margin: 1rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
      font-size:30px;
    }
  }

  .hero-para{
    text-align: justify;
    font-size: larger;
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 90%;
    height: auto;
  }

  .btn-shop{
    position: relative;
    right: 31.5rem;
    width: 7rem;
    top: 0rem;
  }
    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
    }
  }
`;

export default HeroSection;