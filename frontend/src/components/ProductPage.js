import { Link } from "react-router-dom"
import routeNames from "../constants/routeNames"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchProducts } from "../state/actions/productActions";
import { StarIcon } from "@heroicons/react/20/solid";
import { formatPrice, formatRating, formatRatingCount } from "../utils/formating";
import Loading from "./Loading";
import Error from "./Error";


const ProductPage = () => {
    const { products, loading, error } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    // use the store 
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <Loading />
    if (error) return <Error msg={error} />

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => {
                        const rating = formatRating(product.rating ?? 4.5111);
                        const ratingCount = formatRatingCount(product.ratingCount ?? 1000);
                        const name = product.name + " (" + product.extra + ")";
                        const price = formatPrice(product.price);
                        const thumbnail = product.thumbnail;
                        const id = product._id;
                        const variantId = product.variantId;

                        return (

                            <Link
                                key={id}
                                className="group relative"
                                to={`${routeNames.PRODUCT_OVERVIEW.replace(':pid', id).replace(':name', name).replace(':vid', variantId ?? '')}`}>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={thumbnail}
                                        alt={name}
                                        className="h-full w-full object-scale-down object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-900">
                                            {name}
                                        </h3>
                                        <div className="flex items-center mt-1 text-sm text-gray-500">
                                            <p>{rating}</p>
                                            <button className="ml-1 flex items-center">
                                                <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                            </button>
                                            <p>
                                                {ratingCount}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {price}
                                    </p>
                                </div>
                            </Link>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductPage;