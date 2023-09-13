import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const DisplayImages = ({ images }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div className="flex items-center justify-center" key={index}>
                        <img
                            src={image}
                            alt={image}
                            className="mx-auto max-w-full h-auto"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default DisplayImages;
