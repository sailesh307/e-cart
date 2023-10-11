import { Link } from "react-router-dom";
import routeNames from "../../constants/routeNames";
import { formatPrice } from "../../utils/formating";


const OrderItem = ({ item }) => {

    let { _id, productId, variantId, name, image, price, quantity } = item;
    price = formatPrice(price);

    return (
        <div className="flex flex-row py-6 sm:py-4 px-3 m-1">
            <Link
                to={`${routeNames.PRODUCT_OVERVIEW}?pid=${productId}`}
                className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-scale-down object-center"
                />
            </Link>

            <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                        <Link
                            to={`${routeNames.PRODUCT_OVERVIEW}?pid=${productId}`}
                            className="line-clamp-3"
                        >
                            {name}
                        </Link>
                    </h3>
                    <p className="ml-4"> {price}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderItem