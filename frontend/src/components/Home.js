import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routeNames from "../constants/routeNames";
import { Card, Carousel, Typography, CardHeader, CardBody, CardFooter, Tooltip, Avatar } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const images1 = [
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/22a2280219e3a53b.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/ee78de50f9dbe993.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/70fbd9b4e3a30dfd.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/4cd6690ef44564f3.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/ed12b7707a04473c.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/5df65ad101e18dbf.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/cb8a624c94eb850e.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/364c9a92201246a6.jpg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/cb8a624c94eb850e.jpg?q=20'
]

const images2 = [
  'https://rukminim1.flixcart.com/fk-p-flap/1250/600/image/27c0e35221323246.png?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1248/555/image/deaff177661289e6.png?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1250/600/image/cb737cf61f299aa0.png?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1250/600/image/56b690651de5066e.png?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1250/600/image/04dc4ad03726dcd5.png?q=20',
]

// Kithen decoration images
const kithen_decorations = [
  'https://m.media-amazon.com/images/I/71INUdb9sKL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/71dvRDwF1LL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/41hyNqfyY1L._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/51ijJmfphjL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/71FNpgnDNIL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/71PhfgZbiYL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/51RcbsbvSuL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/61eOahN2yJL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/61I0kLiWgDL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/61kUBbd4fDL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/41NAjfaGkFL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/71GxYjnPDqL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/417VymalqWS._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/71-2zCzndtL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/61PwMOmZ7tL._AC_SY200_.jpg',
]

// Home decoration images
const home_decorations = [
  'https://m.media-amazon.com/images/I/81hsrTnBJVL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/A1y0pN6bF+L._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/8106i+p8InL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/41aug3UbO6S._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/81Y72sSr53L._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/61sHEp2-QuL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/61-uOaWQ98L._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/61UemIrBUYL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/815oyK65PFS._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/51qOYDpDJoL._AC_SY200_.jpg',
]

const new_arrivals = [
  'https://m.media-amazon.com/images/I/71e0s+sy7EL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/71vQOAjsRsL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/71pBqe85pGL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/81UAGgUDBlL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/51crSvDDz9L._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/613aWImHVWL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/51Ztc3cuiSL._AC_SY200_.jpg',
  'https://m.media-amazon.com/images/I/51XOdoEk5zL._AC_SY200_.jpg',
  

]

const categories = [
  {
    name: 'Grocery',
    image: 'https://rukminim1.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png?q=100'
  },
  {
    name: 'Mobiles',
    image: 'https://rukminim1.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100'
  },
  {
    name: 'Fashion',
    image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100'
  },
  {
    name: 'Electronics',
    image: 'https://rukminim1.flixcart.com/flap/80/80/image/69c6589653afdb9a.png?q=100'
  },
  {
    name: 'Appliances',
    image: 'https://rukminim1.flixcart.com/flap/80/80/image/0ff199d1bd27eb98.png?q=100'
  },
  {
    name: 'Home & Furniture',
    image: 'https://rukminim1.flixcart.com/flap/80/80/image/ab7e2b022a4587dd.jpg?q=100'
  },
  {
    name: 'Appliances',
    image: 'https://rukminim1.flixcart.com/flap/80/80/image/0ff199d1bd27eb98.png?q=100'
  },
  {
    name: 'Home & Furniture',
    image: 'https://rukminim1.flixcart.com/flap/80/80/image/ab7e2b022a4587dd.jpg?q=100'
  },
]

const delivery = [
  {
    title: 'Wide Selection',
    image: ''
  },
  {
    title: 'Pay On Delivery',
    image: ''
  },
  {
    title: 'Easy Returns',
    image: ''
  }
]

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  if (user?.role === "admin") {
    navigate(routeNames.ADMIN_DASHBOARD);
  }
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [images, setImages] = useState([])
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  // call when screen size changes
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (screenWidth > 768) {
      setImages(images1)
    } else {
      setImages(images2)
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth])

  return (
    <div className="bg-blue-gray-100 h-full m-3 space-y-2">
      {/* categories */}
      <div className=' bg-white flex flex-row h-30 gap-3 lg:gap-10 overflow-x-scroll no-scrollbar md:justify-center' >
        {
          categories.map((category, index) => (
            <button key={index} className="w-20 hover:text-blue-700">
              <div className="w-20 h-20">
                <img src={category.image} alt={category.name} />
              </div>
              <p className="text-center text-sm">
                {category.name}
              </p>

            </button>
          ))
        }
      </div>

      {/* Slider */}
      <Carousel
        autoplay={true}
        loop={true}
        transition={{
          type: "spring",
        }}
        className="shadow-xl"
      >
        {
          images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))
        }
      </Carousel>

      {/* About delivery */}
      <div className=" flex justify-center items-center">
        <img
          src='https://m.media-amazon.com/images/I/41P-ARf+EcL._SR1245,150_.jpg'
          alt="about delivery"
          className="w-full"
        />
      </div>
      {/* Oragnize your kitchen */}
      <div className="bg-white">
        <h6 >Up to 60% off | Oraganize your kitchen according to you</h6>

        <div className=' flex flex-row mt-2 overflow-x-scroll no-scrollbar'>
          {
            kithen_decorations.map((ele, index) => (
              <div key={index} className="hover:text-blue-700">
                <div key={index} className="w-24 h-24 md:w-48 md:h-48">
                  <img src={ele} alt={ele} className="w-24 h-24 md:w-48 md:h-48 object-contain" />
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {/*  */}
      <div className=" flex justify-center items-center">
        <img
          src='https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg'
          alt="Home Furnishings"
          className="w-full"
        />
      </div>
      {/* home decoration */}
      <div className="bg-white">
        <h6 >Up to 70% off | Redecorate your home</h6>

        <div className=' flex flex-row mt-2 overflow-x-scroll no-scrollbar'>
          {
            home_decorations.map((ele, index) => (
              <div key={index} className="hover:text-blue-700">
                <div key={index} className="w-24 h-24 md:w-48 md:h-48">
                  <img src={ele} alt={ele} className="w-24 h-24 md:w-48 md:h-48 object-contain" />
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {/* New Arrivals */}
      <div className="bg-white">
        <h6 >Up to 50% off | Get ready to rumble with our latest arrivals</h6>

        <div className=' flex flex-row mt-2 overflow-x-scroll no-scrollbar'>
          {
            new_arrivals.map((ele, index) => (
              <div key={index} className="hover:text-blue-700">
                <div key={index} className="w-24 h-24 md:w-48 md:h-48">
                  <img src={ele} alt={ele} className="w-24 h-24 md:w-48 md:h-48 object-contain" />
                </div>
              </div>
            ))
          }
        </div>
      </div>



    </div>
  );
};

export default Home;