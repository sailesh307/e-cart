import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DisplayProductDetails from './DisplayProductDetails'
import { fetchAProduct } from '../state/actions/productActions'
import Loading from './Loading'
import Error from './Error'

const ProducOverview = () => {
    const dispatch = useDispatch();
    const { selectedProduct, singleProductLoading, singleProductError } = useSelector((state) => state.products);
    const { pid } = useParams(); // Access the id parameter from the URL

    useEffect(() => {
        dispatch(fetchAProduct(pid));
    }, [dispatch, pid]);

    if (singleProductLoading) {
        return <Loading />;
    }
    if (singleProductError) {
        return <Error msg={singleProductError} />;
    }

    return selectedProduct && (
        <DisplayProductDetails data={selectedProduct}/>
    );
}

export default ProducOverview;