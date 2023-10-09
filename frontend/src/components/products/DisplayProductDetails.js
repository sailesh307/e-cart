import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import routeNames from '../../constants/routeNames'
import { useNavigate } from 'react-router-dom'
import SelectionBox from './SelectionBox'
import { addProductToCart } from '../../state/actions/cartActions'
import DisplayImages from '../DisplayImages'
import { formatPrice, formatRating, formatRatingCount } from '../../utils/formating'
import { Button, Typography } from '@material-tailwind/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const DisplayProductDetails = ({ data }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);

    //////////////// Data extraction ////////////////////
    /////////extract non changeable attributes //////////
    const { _id, name, about, highlights, details, rating, ratingCount, images, price } = data ?? {};
    const pid = _id;
    // const { allColors, allSizes, variantData } = data?.variant ?? {};

    ////////////////// states ///////////////////////
    // const [activeColors, setActiveColors] = useState(allColors);
    // const [activeSizes, setActiveSizes] = useState(allSizes);

    // const [selectedColor, setSelectedColor] = useState(activeColors[0]);
    // const [selectedSize, setSelectedSize] = useState(activeSizes[0]);
    const [selectedVariant, setSelectedVariant] = useState(null);


    /////////////////////// changeable attributes /////////////////
    const [currentImages, setCurrentImages] = useState(images ?? []);
    const [currentPrice, setCurrentPrice] = useState(price);
    ///////////////////////////////////////////////////////////////

    ////// adding to cart facility //////////
    const cart = useSelector((state) => state.cart);
    const { items } = cart;
    const products = items;
    const navigate = useNavigate();
    // go to cart 
    const handleGoToCart = (e) => {
        e.preventDefault();
        navigate(routeNames.CART);
    };
    // check if product is already in cart

    const [isInCart, setIsInCart] = useState(false);

    // useEffect(() => {
    //     // make list of active colors for selected size
    //     const activeColors = [];
    //     variantData.forEach((variant) => {
    //         if (variant.size === selectedSize) {
    //             activeColors.push(variant.color);
    //         }
    //     });
    //     setActiveColors(activeColors);

    //     // make list of active size for selected color
    //     const activeSizes = [];
    //     variantData.forEach((variant) => {
    //         if (variant.color === selectedColor) {
    //             activeSizes.push(variant.size);
    //         }
    //     }
    //     );
    //     setActiveSizes(activeSizes);

    //     // set current price and stock
    //     variantData.forEach((variant) => {
    //         if (variant.color === selectedColor && variant.size === selectedSize) {
    //             setCurrentPrice(variant.price);
    //             setSelectedVariant(variant._id);
    //         }
    //     });

    //     // set current images
    //     variantData.forEach((variant) => {
    //         if (variant.color === selectedColor && variant.size === selectedSize) {
    //             setCurrentImages(variant.images.length === 0 ? images : variant.images);
    //         }
    //     });
    //     setIsInCart(products?.some((product) => product.productId === pid && product.variantId === selectedVariant));
    // }, [images, pid, products, selectedColor, selectedSize, selectedVariant, variantData]);


    const handleColorChange = (color) => {
        // setSelectedColor(color);
    }
    const handleSizeChange = (size) => {
        // setSelectedSize(size);
    }

    // {
    //     "productId": "650147a6395fe358871d0394",
    //     "variantId": "650147a6395fe358871d0395",
    //     "name": "iPhone 14 Pro(Space Black | 128 GB)",
    //     "price": 100999,
    //     "color": "Space Black",
    //     "quantity": 1,
    //     "image": "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/y/l/p/-original-imaghxemc3wtcuhb.jpeg?q=70",
    //     "_id": "650189ba29c4466bcd0dd368"
    // }

    const handleAddToCart = (e) => {
        e.preventDefault();
        // check if user is logged in
        if (!token) {
            navigate(routeNames.SIGNIN);
            return;
        }
        dispatch(addProductToCart(pid, selectedVariant));
    };
    return (
        <div className="bg-white flex flex-col lg:flex-row">
            {/* Left side for images */}
            <div className="lg:w-1/2">
                {/* center it */}
                <div className="m-4 p-2 sticky top-14">
                    {/* Image gallery */}
                    <DisplayImages images={currentImages} />
                </div>
            </div>

            {/* Right side for product details */}
            <div className="lg:w-1/2">
                <div className="mx-auto max-w-2xl pb-16 pt-10 p-5">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {name}
                    </h1>

                    {/* Product info */}
                    <div className="mt-4">
                        <h2 className="sr-only">Product information</h2>
                        {/* About price */}
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <Typography className="text-3xl font-bold text-gray-900">
                                {formatPrice(currentPrice.selling)}
                            </Typography>
                            <Typography className="text-sm line-through font-medium text-gray-700">
                                MRP: {formatPrice(currentPrice.mrp)}
                            </Typography>
                            <Typography className="text-sm font-medium text-gray-900">
                                {(((currentPrice.mrp - currentPrice.selling) / price.mrp) * 100).toFixed(0)}% off
                            </Typography>
                        </div>
                        {/* Reviews */}
                        {rating && <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <p className="text-sm text-gray-900">
                                    {formatRating(rating)}
                                    <span className="sr-only"> out of 5 stars</span>
                                </p>
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((star) => (
                                        <StarIcon
                                            key={star}
                                            className={classNames(
                                                rating > star ? 'text-gray-900' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p
                                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                >
                                    {formatRatingCount(ratingCount)} reviews
                                </p>
                            </div>
                        </div>}

                        <form className="mt-10">
                            {/* Colors */}
                            {/* {allColors.length && (
                                <SelectionBox
                                    name={'Color'}
                                    list={allColors}
                                    activeList={activeColors}
                                    setter={handleColorChange}
                                />
                            )} */}
                            {/* Size */}
                            {/* {allSizes.length && (
                                <SelectionBox
                                    name={'Size'}
                                    list={allSizes}
                                    activeList={activeSizes}
                                    setter={handleSizeChange}
                                />
                            )} */}

                            {/* if product is already in cart show View Cart else Add to Cart */}
                            {/* if product not avaiable display add to cart */}

                            <Button
                                type="submit"
                                className="w-full text-base font-medium"
                                onClick={isInCart ? handleGoToCart : handleAddToCart}
                            >
                                {isInCart ? 'View Cart' : 'Add to Cart'}
                            </Button>
                        </form>
                    </div>

                    {/* About product */}
                    {about && about.length !== 0 && <div className="mt-10">
                        <h3 className="text-xl font-bold text-gray-900">About this item</h3>
                        <div className="mt-2">
                            <ul className="list-disc space-y-2 pl-4 text-sm">
                                {about.map((aboutItem, index) => (
                                    <li key={index} className="text-gray-900 text-start">
                                        {aboutItem}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>}

                    {/* highlights */}
                    {highlights && highlights.length !== 0 && <div className="mt-10">
                        <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                        <div className="mt-4">
                            <ul className="list-disc space-y-2 pl-4 text-sm">
                                {highlights.map((highlight, index) => (
                                    <li key={index} className="text-gray-400">
                                        <span className="text-gray-600">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default DisplayProductDetails;

/* 
{
    "sellerId": "64f47230eb36c0ba94bdf171",
    "keywords": [
        "redmi",
        "mi",
        "note 10"
    ],
    "category": "phone",
    "name": "REDMI Note 10 Pro Max",
    "brand": "Redmi",
    "price": {
        "mrp": 19999,
        "selling": 16999,
        "_id": "6522c71c28cfa498362761e1"
    },
    "stock": 2,
    "highlights": [
        "6GB RAM, 128GB Storage",
        "64MP with 5MP Super Tele-Macro",
        "120Hz Super Amoled Display"
    ],
    "about": [
        "Renewed product is tested to work and look like new with minimal to no signs of wear & tear",
        "Product comes with relevant accessories",
        "Backed by a minimum six-month seller warranty",
        "Box may be generic",
        "Processor: Qualcomm Snapdragon 732G with Kryo 470 Octa-core; 8nm process; Up to 2.3GHz clock speed",
        "Camera: 64 MP Quad Rear camera with 8MP Ultra-wide, 5MP Telemacro, and Portrait lens| 16 MP Front camera",
        "Display: 120Hz high refresh rate FHD+ (1080x2400) AMOLED Dot display; 16.9 centimeters (6.67 inch); 20:9 aspect ratio; HDR 10 support",
        "Battery: 5020 mAH large battery with 33W fast charger in-box and Type-C connectivity"
    ],
    "shippingFee": 0,
    "images": [
        "https://rukminim2.flixcart.com/image/416/416/kmgn0cw0/mobile/i/q/y/note-10-pro-1153-redmi-original-imagfdfxkvjsf9ga.jpeg?q=70"
    ],
    "variant": [],
    "rating": 2.5,
    "ratingCount": 430156,
    "_id": "6522c71c28cfa498362761e0",
    "createdAt": "2023-10-08T15:13:32.197Z",
    "__v": 0
}

*/