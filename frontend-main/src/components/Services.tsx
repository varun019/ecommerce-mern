import styled from "styled-components";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";

const Services = (): JSX.Element => {
  return (
    <Wrapper>
      <div className="container">
        <div className="box">
          <div className="row">
            <div className="col-sm-4">
            <div className="services-1">
              <div>
                <TbTruckDelivery className='icon' />
                <h3 style={{fontSize:"22px"}}>Super Fast and Free Delievery in all over India</h3>
              </div>
            </div>
            </div>
            <div className="col-sm-4">
            <div className="services-2">
              <div className="services-colum-2">
                <div>
                  <MdSecurity className="icon" />
                  <h3>Non-Contact Shipping</h3>
                </div>
              </div>
              <div className="services-colum-2">
                <div>
                  <GiReceiveMoney className='icon' />
                  <h3>Easy Return Policy</h3>
                </div>
              </div>
            </div>
            </div>
            <div className="col-sm-4">
            <div className="services-3">
              <div>
                <RiSecurePaymentFill className="icon" />
                <h3 style={{fontSize:"22px"}}>Secure Payment Methods</h3>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 2rem 0;

  .grid {
    gap: 4.8rem;
  }

  .services-1,
  .services-2,
  .services-3 {
    width: auto;
    height: 17rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: rgb(236 237 239);
    text-align: center;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    padding:10px;
  }
  .services-2 {
    gap: 1rem;
    background: #fff;
    box-shadow: none;
    .services-colum-2 {
      display: flex;
      flex-direction: row;
      flex: 1;
      background:rgb(236 237 239);
      justify-content: center;
      align-items: center;
      border-radius: 2rem;
      padding:10px;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 2rem;
      }
      h3{
        font-size:22px;
        text-align:left;
        margin:0;
      }
      .icon {
        width: 6rem;
        min-width:6rem;
        height: 6rem;
        padding: 1rem;
        border-radius: 50%;
        background-color: #fff;
        color: #5138ee;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    .box {
      justify-content: space-between;
    }
  }
  h3 {
    margin-top: 1.4rem;
    font-size: 2rem;
  }
  .icon {
    /* font-size: rem; */
    width: 8rem;
    height: 8rem;
    padding: 2rem;
    border-radius: 50%;
    background-color: #fff;
    color: #5138ee;
  }
`;

export default Services;
