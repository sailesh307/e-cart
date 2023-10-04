import { Link } from "react-router-dom"
import routeNames from "../../constants/routeNames"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchProducts } from "../../state/actions/productActions";
import { formatPrice, formatRating, formatRatingCount } from "../../utils/formating";
import Error from "../Error";
import Loader from "../layout/loader/Loader";
import { Card, CardBody, CardHeader, Chip, Rating, Typography } from "@material-tailwind/react";


const ProductPage = () => {
    const { products, loading, error } = useSelector((state) => state.allProducts);
    const dispatch = useDispatch();
    // use the store 
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <Loader />
    if (error) return <Error msg={error} />

    return (
        <div className="">
            <div className="">
                <div className="mt-4 gap-y-10">
                    {products.map((product) => {
                        const rating = formatRating(product.rating);
                        const ratingCount = formatRatingCount(product.ratingCount);
                        const name = product.name + " (" + product.extra + ")";
                        const price = formatPrice(product.price);
                        const thumbnail = product.thumbnail;
                        const id = product._id;
                        const variantId = product.variantId;

                        return (
                            <Card key={variantId} className="flex flex-col md:flex-row p-1 m-2">
                                <Link
                                    to={`${routeNames.PRODUCT_OVERVIEW + '?pid=' + id + '&vid=' + variantId + '&name=' + name}`}
                                >
                                    <CardHeader shadow={false} floated={false} className="hover:opacity-75 items-center">
                                        <div className="flex justify-center items-center">
                                            <img
                                                src={thumbnail}
                                                alt={name}
                                                className="h-48 w-48 object-contain"
                                            />
                                        </div>
                                    </CardHeader>
                                </Link>
                                <CardBody className="flex flex-col items-start justify-between gap-4 group-hover:opacity-75">

                                    <Link
                                        to={`${routeNames.PRODUCT_OVERVIEW + '?pid=' + id + '&vid=' + variantId + '&name=' + name}`}
                                    >
                                        <Typography className="font-medium text-gray-900 hover:opacity-75">
                                            {name}
                                        </Typography>
                                    </Link>
                                    <Typography className="text-lg font-medium text-gray-900">
                                        {price}
                                    </Typography>
                                    <div className="w-max">
                                        <Chip
                                            variant="ghost"
                                            size="sm"
                                            value="Free Shipping"
                                            color="green"
                                        />
                                    </div>
                                    <div className="flex items-center h-2 flex-grow gap-0.5 text-gray-600">
                                        <Typography>{rating}</Typography>
                                        <Rating className="h-0" value={Math.round(rating)} readonly />
                                        <Typography>
                                            {ratingCount}
                                        </Typography>
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductPage;