import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import DisplayProductDetails from './DisplayProductDetails'
import { fetchProductDetails } from '../../state/actions/productActions'

import Error from '../Error'
import Loader from '../layout/loader/Loader'

const ProducOverview = () => {
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetail);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const pid = params.get('pid');
    const vid = params.get('vid');


    useEffect(() => {
        dispatch(fetchProductDetails(pid));
    }, [dispatch, pid]);

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <Error msg={error} />;
    }

    return product && (
        <DisplayProductDetails data={product} vid={vid} />
    );
}

export default ProducOverview;