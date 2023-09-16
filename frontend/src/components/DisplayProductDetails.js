import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import routeNames from '../constants/routeNames'
import { useNavigate } from 'react-router-dom'
import SelectionBox from './SelectionBox'
import { addProductToCart } from '../state/actions/cartActions'
import DisplayImages from './DisplayImages'
import { formatRating, formatRatingCount } from '../utils/formating'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const DisplayProductDetails = ({ data }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    //////////////// Data extraction ////////////////////
    /////////extract non changeable attributes //////////
    const { _id, name, description, highlights, details, rating, ratingCount, commonImages } = data ?? {};
    const pid = _id;
    const { allColors, allSizes, variantData } = data?.variant ?? {};

    ////////////////// states ///////////////////////
    const [activeColors, setActiveColors] = useState(allColors);
    const [activeSizes, setActiveSizes] = useState(allSizes);

    const [selectedColor, setSelectedColor] = useState(activeColors[0]);
    const [selectedSize, setSelectedSize] = useState(activeSizes[0]);
    const [selectedVariant, setSelectedVariant] = useState(-1);


    /////////////////////// changeable attributes /////////////////
    const [currentImages, setCurrentImages] = useState(commonImages ?? []);
    const [currentPrice, setCurrentPrice] = useState('NA');
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

    useEffect(() => {
        // make list of active colors for selected size
        const activeColors = [];
        variantData.forEach((variant) => {
            if (variant.size === selectedSize) {
                activeColors.push(variant.color);
            }
        });
        setActiveColors(activeColors);

        // make list of active size for selected color
        const activeSizes = [];
        variantData.forEach((variant) => {
            if (variant.color === selectedColor) {
                activeSizes.push(variant.size);
            }
        }
        );
        setActiveSizes(activeSizes);

        // set current price and stock
        variantData.forEach((variant) => {
            if (variant.color === selectedColor && variant.size === selectedSize) {
                setCurrentPrice(variant.price);
                setSelectedVariant(variant._id);
            }
        });

        // set current images
        variantData.forEach((variant) => {
            if (variant.color === selectedColor && variant.size === selectedSize) {
                setCurrentImages(variant.images.length === 0 ? commonImages : variant.images);
            }
        });
        setIsInCart(products?.some((product) => product.productId === pid && product.variantId === selectedVariant));
    }, [commonImages, pid, products, selectedColor, selectedSize, selectedVariant, variantData]);


    const handleColorChange = (color) => {
        setSelectedColor(color);
    }
    const handleSizeChange = (size) => {
        setSelectedSize(size);
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
        const fullName = `${name} (${selectedColor} | ${selectedSize})`;
        // remove 
        const item = {
            productId: pid,
            variantId: selectedVariant,
            name: fullName,
            price: currentPrice,
            color: selectedColor,
            quantity: 1,
            image: currentImages[0],
        }
        dispatch(addProductToCart(item));
    };
    return (
        <div className="bg-white flex flex-col lg:flex-row">
            {/* Left side for images */}
            <div className="md:w-1/2">
                {/* center it */}
                <div className="pt-6 m-4">
                    {/* Image gallery */}
                    <DisplayImages images={currentImages} />
                </div>
            </div>

            {/* Right side for product details */}
            <div className="lg:w-1/2 p-4">
                <div className="mx-auto max-w-2xl pb-16 pt-10">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {`${name} (${selectedColor} | ${selectedSize})`}
                    </h1>

                    {/* Product info */}
                    <div className="mt-4">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">₹ {currentPrice}</p>

                        {/* Reviews */}
                        <div className="mt-6">
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
                                <a
                                    href="/"
                                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                >
                                    {formatRatingCount(ratingCount)} reviews
                                </a>
                            </div>
                        </div>

                        <form className="mt-10">
                            {/* Colors */}
                            {allColors.length && (
                                <SelectionBox
                                    name={'Color'}
                                    list={allColors}
                                    activeList={activeColors}
                                    setter={handleColorChange}
                                />
                            )}
                            {/* Size */}
                            {allSizes.length && (
                                <SelectionBox
                                    name={'Size'}
                                    list={allSizes}
                                    activeList={activeSizes}
                                    setter={handleSizeChange}
                                />
                            )}

                            {/* if product is already in cart show View Cart else Add to Cart */}
                            {/* if product not avaiable display add to cart */}

                            <button
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={isInCart ? handleGoToCart : handleAddToCart}
                            >
                                {isInCart ? 'View Cart' : 'Add to Cart'}
                            </button>
                        </form>
                    </div>

                    {/* Description and details */}
                    <div className="mt-10">
                        <h3 className="sr-only text-sm font-medium text-gray-900">Description</h3>
                        <div className="space-y-6">
                            <p className="text-base text-gray-900">{description}</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                        <div className="mt-4">
                            <ul className="list-disc space-y-2 pl-4 text-sm">
                                {highlights.map((highlight) => (
                                    <li key={highlight} className="text-gray-400">
                                        <span className="text-gray-600">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-sm font-medium text-gray-900">Details</h2>
                        <div className="mt-4 space-y-6">
                            <p className="text-sm text-gray-600">{details}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DisplayProductDetails;