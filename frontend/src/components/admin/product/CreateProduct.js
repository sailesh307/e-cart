import React, { useEffect } from 'react'
import ProductForm from './ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, resetCreateProductState } from '../../../state/actions/productActions'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import routeNames from '../../../constants/routeNames'

const CreateProduct = () => {
  const { success, error, loading } = useSelector((state) => state.createProduct)
  const navigation = useNavigate()

  const dispatch = useDispatch()
  const handleCreateProduct = (product) => {
    dispatch(createProduct(product))
  }

  useEffect(() => {
    if (success) {
      enqueueSnackbar('Product created successfully', { variant: 'success' })
      dispatch(resetCreateProductState())
      navigation(routeNames.ADMIN_DASHBOARD);
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [success, error, navigation, dispatch])
  
  return (
    <ProductForm onSubmit={handleCreateProduct} headerText={'Create Product'} loading={loading} />
  )
}

export default CreateProduct