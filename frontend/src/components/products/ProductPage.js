import { Link, useLocation } from "react-router-dom"
import routeNames from "../../constants/routeNames"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { setSearchQuery, fetchProducts } from "../../state/actions/productActions";
import { formatPrice, formatRating, formatRatingCount } from "../../utils/formating";
import Error from "../Error";
import Loader from "../layout/loader/Loader";
import { Card, CardBody, CardHeader, Chip, Rating, Typography } from "@material-tailwind/react";
import PaginationComponent from "./PaginationComponents";

const ProductPage = () => {
    const { products = [], loading, error, totalPages } = useSelector((state) => state.allProducts);
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q');

    useEffect(() => {
        dispatch(setSearchQuery(searchQuery));
        dispatch(fetchProducts());
    }, [searchQuery, dispatch])

    if (loading) return <Loader />
    if (error) return <Error msg={error} />

    const handlePageChange = (pageNo) => {
        dispatch(fetchProducts(pageNo));
    }

    return (
        <div className="">
            <div className="flex flex-col items-center overflow-hidden">
                {/* show products */}
                <div className="m-2 mt-4 flex flex-col">
                    {products.map((product) => {
                        const image = product.images[0];
                        const name = product.name;
                        const stock = product.stock;
                        const notInStock = stock === 0;
                        const freeDelivery = product.shippingFee === 0;
                        const price = product.price;
                        const discount = (((price.mrp - price.selling) / price.mrp) * 100).toFixed(0);

                        const mrp = formatPrice(price.mrp);
                        const sellingPrice = formatPrice(price.selling);

                        const rating = formatRating(product.rating);
                        const ratingCount = formatRatingCount(product.ratingCount);

                        const getDeliveryDate = () => {
                            const currentDate = new Date();
                            const randomNumberOfDays = Math.floor(Math.random() * 12) + 1;
                            const futureDate = new Date(currentDate);
                            futureDate.setDate(currentDate.getDate() + randomNumberOfDays);

                            // Format the date as "Tuesday, 10 October"
                            var options = { weekday: 'long', day: 'numeric', month: 'long' };
                            var formattedDate = futureDate.toLocaleDateString('en-US', options);
                            return formattedDate;
                        }
                        const getItBy = getDeliveryDate();

                        const id = product._id;

                        return (
                            <Card key={id} className="flex flex-col md:flex-row p-1 m-2 bg-blue-gray-50/50">
                                <CardHeader shadow={false} floated={false} className="hover:opacity-75 my-4">
                                    <Link
                                        to={`${routeNames.PRODUCT_OVERVIEW + '?pid=' + id + '&name=' + name}`}
                                        className="flex justify-center"
                                    >
                                        <img
                                            src={image}
                                            alt={name}
                                            className="h-48 w-48 object-contain"
                                        />
                                    </Link>
                                </CardHeader>
                                <CardBody className="flex flex-col gap-3 p-4 group-hover:opacity-75">

                                    <Link
                                        to={`${routeNames.PRODUCT_OVERVIEW + '?pid=' + id + '&name=' + name}`}
                                    >
                                        <p className="font-medium text-lg line-clamp-2 text-gray-900 hover:opacity-75">
                                            {name}
                                        </p>
                                    </Link>
                                    {/* rating */}
                                    <div className="flex items-center h-2 flex-grow gap-x-0.5 text-gray-600">
                                        <Typography>{rating}</Typography>
                                        <Rating className="h-0" value={Math.round(rating)} readonly />
                                        <Typography>
                                            {ratingCount}
                                        </Typography>
                                    </div>
                                    {/* About price */}
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                        <Typography className="text-3xl font-bold text-gray-900">
                                            {sellingPrice}
                                        </Typography>
                                        <Typography className="text-sm line-through font-medium text-gray-700">
                                            MRP: {mrp}
                                        </Typography>
                                        <Typography className="text-sm font-medium text-gray-900">
                                            ({discount}% off)
                                        </Typography>
                                    </div>
                                    {/* expected delivery date */}
                                    <Typography className="text-sm font-medium text-gray-900">
                                        Get it by <span className="font-bold">{getItBy}</span>
                                    </Typography>
                                    {
                                        notInStock ?
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value="Out of Stock"
                                                />
                                            </div>
                                            : freeDelivery && <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value="Free Shipping"
                                                    color="green"
                                                />
                                            </div>
                                    }

                                </CardBody>
                            </Card>
                        )
                    }
                    )}
                </div>

                {/* show pagination componant */}

                <PaginationComponent pageCount={totalPages} handler={handlePageChange} />

            </div>
        </div>
    )
}

export default ProductPage;

/* 
 {
            "keywords": [],
            "_id": "65218f82509e4b0f8a471387",
            "sellerId": "64f47230eb36c0ba94bdf171",
            "category": "phone",
            "name": "SAMSUNG Galaxy Z Flip3 5G",
            "brand": "SAMSUNG",
            "price": {
                "mrp": 59999,
                "selling": 49999,
                "_id": "65218f82509e4b0f8a471388"
            },
            "stock": 10,
            "highlights": [
                "8 GB RAM | 128 GB ROM",
                "17.02 cm (6.7 inch) Full HD+ Display",
                "12MP + 12MP | 10MP Front Camera",
                "3300 mAh Lithium-ion Battery",
                "Qualcomm Snapdragon 888 Octa-Core Processor"
            ],
            "about": [],
            "shippingFee": 0,
            "images": [
                "https://rukminim2.flixcart.com/image/416/416/ksnjp8w0/mobile/w/u/8/galaxy-z-flip3-5g-sm-f711bzeeinu-samsung-original-imag662adrayy6cg.jpeg?q=70",
                "https://rukminim2.flixcart.com/image/416/416/ksnjp8w0/mobile/5/9/n/galaxy-z-flip3-5g-sm-f711bzeeinu-samsung-original-imag662augbs5nfk.jpeg?q=70",
                "https://rukminim2.flixcart.com/image/416/416/ksnjp8w0/mobile/n/x/4/galaxy-z-flip3-5g-sm-f711bzeeinu-samsung-original-imag662avncb2hvs.jpeg?q=70"
            ],
            "variant": [
                {
                    "color": "Phantom Black",
                    "size": "128 GB",
                    "price": {
                        "mrp": 59999,
                        "selling": 49999,
                        "_id": "65218f82509e4b0f8a47138a"
                    },
                    "stock": 10,
                    "images": [],
                    "_id": "65218f82509e4b0f8a471389"
                }
            ],
            "rating": 4.1,
            "ratingCount": 312864,
            "createdAt": "2023-10-07T17:04:02.664Z",
            "__v": 0
        }

*/