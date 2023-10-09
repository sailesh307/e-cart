import { Link } from "react-router-dom";
import routeNames from "../../constants/routeNames";
import { useDispatch } from "react-redux";
import { changeProductQuantity, removeProductFromCart } from "../../state/actions/cartActions";
import { formatPrice } from "../../utils/formating";
import { enqueueSnackbar } from "notistack";
import { Button, Card } from "@material-tailwind/react";

const CartItem = ({ item }) => {
    let { _id, productId, variantId, name, price, color, quantity, image, size, stock } = item;
    price = formatPrice(price.selling);

    const dispatch = useDispatch();

    const handleRemoveFromCart = () => {
        enqueueSnackbar('Removed from cart', { variant: 'success' });
        dispatch(removeProductFromCart(_id));
    };

    const handleQuantityChange = (e) => {
        const quantity = e.target.value;
        dispatch(changeProductQuantity(_id, quantity));
    };

    return (
        <Card className="flex flex-row py-6 sm:py-4 px-3 m-1 bg-blue-gray-50/50">
            <Link
                to={`${routeNames.PRODUCT_OVERVIEW}?pid=${productId}`}
                className="h-24 w-24 md:h-32 md:w-32 lg:h-52 lg:w-52 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-scale-down object-center"
                />
            </Link>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <Link
                                to={`${routeNames.PRODUCT_OVERVIEW}?pid=${productId}`}
                                className="line-clamp-2"
                            >
                                {name}
                            </Link>
                        </h3>
                        <p className="ml-4"> {price}</p>
                    </div>
                    <p className={`mt-1 text-sm ${stock === 0 ? 'text-gray-700' : 'text-green-500'}`}>{stock === 0 ? 'Out of Stock': 'In stock'}</p>
                    <p className="mt-1 text-sm text-gray-700">Eligible for FREE shipping</p>
                    {/* If color */}
                    {color && <p className="mt-1 text-sm"><strong>Colour: </strong>{color}</p>}
                    {/* If size */}
                    { size && <p className="mt-1 text-sm"><strong>Size: </strong>{size}</p>}
                    
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500 mr-2">Qty
                        <select
                            id={`quantity-${_id}`}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="ml-1 py-1 border rounded border-gray-300 focus:outline-none "
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
                        <Button
                            color="red"
                            variant="outlined"
                            onClick={handleRemoveFromCart}
                            type="button"
                            className="font-medium p-1.5 capitalize"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CartItem;
