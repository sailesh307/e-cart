import { Link } from "react-router-dom";
import routeNames from "../../constants/routeNames";
import { useDispatch } from "react-redux";
import { changeQuantity, removeFromCart } from "../../state/actions/cartActions";
import { setMessage } from "../../state/actions/actions";

const CartItem = ({ item }) => {
    const { id, name, price, color, quantity, imageSrc, imageAlt, variantId } = item;
    const productId = id;
    const dispatch = useDispatch();

    const handleRemoveFromCart = () => {
        dispatch(setMessage('Removed from cart'));
        dispatch(removeFromCart(productId, variantId));
    };

    const handleQuantityChange = (e) => {
        const quantity = e.target.value;
        dispatch(changeQuantity(productId, variantId, quantity));
    };

    return (
        <div className="flex py-6 sm:py-4 px-3">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="h-full w-full object-scale-down object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <Link to={`${routeNames.PRODUCT_OVERVIEW}/${id}`}>{name}</Link>
                        </h3>
                        <p className="ml-4"> ₹ {price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{color}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500 mr-2">Qty
                        <select
                            id={`quantity-${id}`}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="ml-1 py-1 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
                        >
                            {
                                [...Array(10)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))
                            }
                        </select>
                    </p>

                    <div className="flex">
                        <button
                            onClick={() => handleRemoveFromCart(id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
