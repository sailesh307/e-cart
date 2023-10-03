import React, { useEffect } from 'react'
import ProductForm from './ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { resetUpdateProductState, updateProduct } from '../../../state/actions/productActions'
import { enqueueSnackbar } from 'notistack'
import { useLocation, useNavigate, useParams } from 'react-router-dom'


const UpdateProduct = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { productData } = location.state
    const { pid } = useParams()

    const dispatch = useDispatch()
    const { success, error, loading } = useSelector((state) => state.updateProduct)

    const handleUpdateProduct = (product) => {
        dispatch(updateProduct(pid, product))
    }

    useEffect(() => {
        if (success) {
            enqueueSnackbar('Product updated successfully', { variant: 'success' })
            dispatch(resetUpdateProductState())
            navigate(-1)
            
        }
        if (error) {
            enqueueSnackbar(error, { variant: 'error' })
        }
    }, [success, error, dispatch, navigate])

    return (
        <ProductForm initialValues={productData} onSubmit={handleUpdateProduct} headerText={'Update Product'} loading={loading} />
    )
}

export default UpdateProduct