import { Backdrop, Card, CircularProgress, IconButton, ListItem, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'

/* const data = {
    sellerId: ObjectId,
    name: String,
    category: String,
    brand: String,
    description: String,
    
    details: [String],
    highlights: [String],

    commonImages: [String],
    variant: {
        allColors: [String],
        allSizes: [String],
        variantData: [{
            color: String,
            size: String,
            price: Number,
            images: [String],
        }],
    },

}; */

const ProductForm = ({ onSubmit, initialValues, headerText , loading}) => {

    const [category, setCategory] = useState(initialValues?.category || '')
    const [name, setName] = useState(initialValues?.name || '')
    const [description, setDescription] = useState(initialValues?.description || '')
    const [brand, setBrand] = useState(initialValues?.brand || '')
    const [details, setDetails] = useState(initialValues?.details?.join('\n') || '')
    const [highlights, setHighlights] = useState(initialValues?.highlights?.join('\n') || '')
    const [commonImages, setCommonImages] = useState(initialValues?.commonImages?.join('\n') || '')
    const [variantData, setVariantData] = useState(
        initialValues?.variant?.variantData?.map((elem) => {
            return {
                color: elem.color ?? '',
                size: elem.size ?? '',
                price: elem.price,
                images: elem.images.join('\n'),
            }
        })
    );

    ////////////////// handlers /////////////////////
    const handleDeleteVariant = (vid) => {
        setVariantData((prev) => {
            const newVariantData = [...prev]
            newVariantData.splice(vid, 1)
            return newVariantData
        })
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const productData = {
            name,
            category,
            brand,
            description,
            details: details.split('\n'),
            highlights: highlights.split('\n'),
            commonImages: commonImages.split('\n'),
            variant: {
                allColors: [...new Set(variantData.map((elem) => elem.color).filter((elem) => elem.length > 0))],
                allSizes: [...new Set(variantData.map((elem) => elem.size).filter((elem) => elem.length > 0))],
                variantData: variantData.map((elem) => {
                    return {
                        color: elem.color === '' ? null : elem.color,
                        size: elem.size === '' ? null : elem.size,
                        price: elem.price,
                        images: elem.images.split('\n').filter((elem) => elem.length > 0),
                    }
                })
            }
        }
        console.log(productData)
        onSubmit(productData);
    }

    // reder add varient data component
    const getVariantDataComponent = (vid) => {
        const { color, size, price, images } = variantData[vid];
        const handleValueChange = (e) => {
            const { name, value } = e.target
            setVariantData(
                (prev) => {
                    const newVariantData = [...prev]
                    newVariantData[vid][name] = value
                    return newVariantData
                }
            )
        }
        return (
            <div className='flex gap-4 flex-col'>
                <div className='flex flex-row gap-2'>
                    <TextField
                        required
                        name='color'
                        size='small'
                        label='Color'
                        fullWidth
                        value={color}
                        onChange={handleValueChange}
                    />
                    <TextField
                        required
                        name='size'
                        size='small'
                        label='Size'
                        fullWidth
                        value={size}
                        onChange={handleValueChange}
                    />
                    <TextField
                        required
                        name='price'
                        size='small'
                        label='Price'
                        fullWidth
                        value={price}
                        onChange={handleValueChange}
                    />
                </div>
                <div>
                    {/* list of images with edit and delete button */}
                    <TextField
                        name='images'
                        size='small'
                        label='Images'
                        fullWidth
                        multiline
                        rows={3}
                        value={images}
                        onChange={handleValueChange}
                    />
                </div>
            </div>
        )
    }

    return (
        <>
            {
                loading ?
                    (<div className=' w-full'>
                        <Backdrop
                            sx={{ color: '#fff' }}
                            open={true}
                        >
                            <div className=' flex flex-col items-center justify-center gap-2'>
                                <span className=' text-lg text-center'>Pleas Wait....</span>
                                <CircularProgress color='inherit' />
                            </div>
                        </Backdrop>
                    </div>)
                    :
                    <form onSubmit={handleFormSubmit} className=' rounded bg-gray-800'>
                        {/* <!-- Heading> */}
                        <div className=' flex justify-between items-center my-2 mb-6'>
                            <h1 className=' text-2xl font-medium'>{headerText}</h1>
                            <button
                                type='submit'
                                className={' bg-primary text-black py-2 px-10 font-bold rounded-sm hover:bg-blue-600'}>
                                Publish
                            </button>
                        </div>
                        {/* <!-- Heading> */}

                        <div className='flex w-full gap-4 flex-col lg:flex-row'>

                            {/* <!-- Left Container> */}
                            <div className=' flex flex-col lg:w-1/2 gap-4'>

                                {/* general info ( name , category , brand, short description) */}
                                <div className=' bg-white p-6 flex w-full shadow rounded flex-col gap-5'>
                                    <h1 className=' text-xl font-medium'>1. General Info</h1>
                                    <TextField
                                        required
                                        label="Product Name"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        size='small'
                                        fullWidth
                                    />
                                    <div className='flex items-center gap-5'>
                                        <TextField
                                            required
                                            label="Category"
                                            name='category'
                                            value={category}
                                            fullWidth
                                            onChange={(e) => setCategory(e.target.value)}
                                            size='small'
                                        />
                                        <TextField
                                            required
                                            label="Brand"
                                            size='small'
                                            value={brand}
                                            fullWidth
                                            onChange={(e) => setBrand(e.target.value)}
                                        />
                                    </div>
                                    <TextField
                                        rows={5}
                                        multiline
                                        label='Short Description'
                                        size={'small'}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                {/* general info */}

                                {/* Detailed Info (Highlights, Details) */}
                                <div className=' bg-white p-6 flex w-full shadow rounded flex-col gap-5'>
                                    <h1 className=' text-xl font-medium'>2. Detailed Info</h1>
                                    <TextField
                                        size='small'
                                        label='Highlights....'
                                        name='highlights'
                                        value={highlights}
                                        multiline
                                        rows={5}
                                        onChange={(e) => setHighlights(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        size='small'
                                        label='Details....'
                                        name='details'
                                        value={details}
                                        multiline
                                        rows={5}
                                        onChange={(e) => setDetails(e.target.value)}
                                        fullWidth
                                    />
                                </div>

                            </div>
                            {/* <!-- Left Container> */}



                            {/* <!-- Right Containiner> */}
                            <div className=' lg:w-1/2 flex flex-col gap-6  rounded p-4'>
                                {/* visual data */}
                                <h1 className=' text-xl font-medium '>3. Visual Data</h1>
                                <div className='bg-white p-6 w-full rounded  gap-4'>
                                    <TextField
                                        required
                                        rows={5}
                                        multiline
                                        label='Common Images'
                                        size={'small'}
                                        value={commonImages}
                                        fullWidth
                                        onChange={(e) => setCommonImages(e.target.value)}
                                    />
                                </div>
                                {/*  */}

                                <h1 className=' text-xl font-medium text-center'>Variants</h1>

                                {/* variant data */}
                                <div className=' flex flex-col gap-4'>
                                    <div className=' flex flex-col gap-4'>
                                        {/* variant data component */}
                                        {
                                            variantData.map((elem, index) => {
                                                return (
                                                    <Card key={index} className=' flex flex-col gap-4 p-2'>
                                                        <ListItem
                                                            secondaryAction={
                                                                <IconButton edge="end" aria-label="delete"
                                                                    onClick={() => handleDeleteVariant(index)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            }
                                                            className='text-lg'
                                                        >
                                                            Variant {index + 1}
                                                        </ListItem>
                                                        {getVariantDataComponent(index)}
                                                    </Card>
                                                )
                                            })
                                        }
                                    </div>
                                    {/* add varient button */}
                                    <button
                                        type='button'
                                        onClick={() => {
                                            setVariantData((prev) => [...prev, {
                                                color: '',
                                                size: '',
                                                price: '',
                                                images: '',
                                            }])
                                        }}
                                        className='bg-blue-500 text-black py-2 px-10 font-bold rounded-sm hover:bg-blue-600'
                                    >
                                        Add Variant
                                    </button>
                                </div>

                            </div>
                            {/* <!-- Right Containiner> */}


                        </div>

                    </form>

            }

        </>
    )
}

export default ProductForm