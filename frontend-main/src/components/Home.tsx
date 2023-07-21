import HeroSection from './HeroSection';
import Trusted from './Trusted';
import Services from './Services';

function Home() {
  const data = { 
    name:"TechnoKart E-commerce"
  }

  return (
    <>
      <HeroSection mydata = {data}/>
      <div className='login-sign'>
      </div>
      <Services/>
      <Trusted/>
    </>
  );
}

export default Home;
