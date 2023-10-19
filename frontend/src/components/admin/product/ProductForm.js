import { Backdrop, CircularProgress, IconButton, InputAdornment, ListItem, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'
import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';

/* const data = {
    "_id": "6522c71c28cfa498362761e0",
    "sellerId": "64f47230eb36c0ba94bdf171",
    "keywords": [
        "redmi",
        "mi",
        "note 10"
    ],
    "category": "phone",
    "name": "REDMI Note 10 Pro",
    "brand": "Redmi",
    "price": {
        "mrp": 19999,
        "selling": 16999,
        "_id": "6522c71c28cfa498362761e1"
    },
    "stock": 2,
    "highlights": [
        "6GB RAM, 128GB Storage",
        "64MP with 5MP Super Tele-Macro",
        "120Hz Super Amoled Display"
    ],
    "about": [
        "Renewed product is tested to work and look like new with minimal to no signs of wear & tear",
        "Product comes with relevant accessories",
        "Backed by a minimum six-month seller warranty",
        "Box may be generic",
        "Processor: Qualcomm Snapdragon 732G with Kryo 470 Octa-core; 8nm process; Up to 2.3GHz clock speed",
        "Camera: 64 MP Quad Rear camera with 8MP Ultra-wide, 5MP Telemacro, and Portrait lens| 16 MP Front camera",
        "Display: 120Hz high refresh rate FHD+ (1080x2400) AMOLED Dot display; 16.9 centimeters (6.67 inch); 20:9 aspect ratio; HDR 10 support",
        "Battery: 5020 mAH large battery with 33W fast charger in-box and Type-C connectivity"
    ],
    "shippingFee": 50,
    "images": [
        "https://rukminim2.flixcart.com/image/416/416/kmgn0cw0/mobile/i/q/y/note-10-pro-1153-redmi-original-imagfdfxkvjsf9ga.jpeg?q=70",
        "https://rukminim2.flixcart.com/image/416/416/l1whaq80/mobile/n/f/p/-original-imagdd5efbyfnhzf.jpeg?q=70"
    ],
    "variant": [],
    "rating": 2.5,
    "ratingCount": 430156,
    "createdAt": "2023-10-08T15:13:32.197Z",
    "__v": 0
};
 */
const ProductForm = ({ onSubmit, initialValues, headerText, loading }) => {

    const [category, setCategory] = useState(initialValues?.category || '')
    const [name, setName] = useState(initialValues?.name || '')
    const [brand, setBrand] = useState(initialValues?.brand || '')
    const [keywords, setKeywords] = useState(initialValues?.keywords?.join(',') || '')
    const [about, setAbout] = useState(initialValues?.about?.join('\n') || '')
    const [highlights, setHighlights] = useState(initialValues?.highlights?.join('\n') || '')
    const [images, setImages] = useState(initialValues?.images?.join('\n') || '')
    const [price, setPrice] = useState(initialValues?.price || { mrp: '', selling: '' })
    const [stock, setStock] = useState(initialValues?.stock || '')
    const [shippingFee, setShippingFee] = useState(initialValues?.shippingFee || '')

    const [variantData, setVariantData] = useState(
        initialValues?.variant?.variantData?.map((elem) => {
            return {
                color: elem.color ?? '',
                size: elem.size ?? '',
                price: elem.price,
                images: elem.images.join('\n'),
            }
        }) ?? []
    );

    ////////////////// handlers /////////////////////
    const handleDeleteVariant = (vid) => {
        setVariantData((prev) => {
            const newVariantData = [...prev]
            newVariantData.splice(vid, 1)
            return newVariantData
        })
    }

    const getFormatedProductData = () => {
        return {
            name,
            category,
            brand,
            keywords: keywords.split(',').map((x) => x.trim()), // array of words
            about: about.split('\n').map((x) => x.trim()), // array of points
            highlights: highlights.split('\n').map((X) => X.trim()), // array of points
            images: images.split('\n').map((x) => x.trim()), // array of images
            price: { mrp: price.mrp, selling: price.selling },
            stock,
            shippingFee,


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
        };
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const productData = getFormatedProductData();
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
                    <form onSubmit={handleFormSubmit} className=' rounded '>
                        {/* <!-- Heading> */}
                        <CardHeader className='flex justify-between items-center p-3 my-2 mb-3 '>
                            <Typography className='text-2xl font-medium'>{headerText}</Typography>
                            <Button
                                type='submit'
                                ripple={true}
                                className='hover:opacity-95'
                            >
                                Publish
                            </Button>
                        </CardHeader>
                        {/* <!-- Heading> */}

                        <CardBody className='flex w-full gap-4 flex-col lg:flex-row'>
                            {/* <!-- Left Container> */}
                            <Card className=' flex flex-col lg:w-1/2 gap-4'>

                                {/* general info ( name , category , brand, short description) */}
                                <Card className=' bg-white p-3 md:p-6 flex w-full shadow rounded flex-col gap-5'>
                                    <Typography className=' text-xl font-medium'>1. General Info</Typography>
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
                                    <div className='flex items-center gap-5'>
                                        <TextField
                                            required
                                            label="Mrp"
                                            name='mrp'
                                            value={price.mrp}
                                            fullWidth
                                            type='number'
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            }}
                                            onChange={(e) => setPrice({ ...price, mrp: e.target.value })}
                                            size='small'
                                        />
                                        <TextField
                                            required
                                            label="Your Price"
                                            size='small'
                                            value={price.selling}
                                            fullWidth
                                            type='number'
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            }}
                                            onChange={(e) => setPrice({ ...price, selling: e.target.value })}
                                        />
                                    </div>
                                    <div className='flex items-center gap-5'>
                                        <TextField
                                            required
                                            label="Shipping Fee"
                                            size='small'
                                            value={shippingFee}
                                            fullWidth
                                            type='number'
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            }}
                                            onChange={(e) => setShippingFee(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            label="Stock"
                                            name='stock'
                                            value={stock}
                                            fullWidth
                                            type='number'
                                            onChange={(e) => setStock(e.target.value)}
                                            size='small'
                                        />
                                    </div>
                                    <Typography className='text-xs'>Seprates keywords by comma(,)</Typography>
                                    <TextField
                                        rows={2}
                                        multiline
                                        label='Keywords'
                                        size={'small'}
                                        value={keywords}
                                        onChange={(e) => setKeywords(e.target.value)}
                                    />
                                </Card>
                                {/* general info */}

                                {/* Detailed Info (Highlights, Details) */}
                                <div className=' bg-white p-3 md:p-6 flex w-full shadow rounded flex-col gap-5'>
                                    <h1 className=' text-xl font-medium'>2. Detailed Info</h1>
                                    <div className='space-y-2'>
                                        <Typography className='text-xs mb-0 pb-0'>Seprate each point by a new line</Typography>
                                        <TextField
                                            size='small'
                                            label='About....'
                                            name='about'
                                            value={about}
                                            multiline
                                            rows={5}
                                            onChange={(e) => setAbout(e.target.value)}
                                            fullWidth
                                        />
                                    </div>

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

                                </div>

                            </Card>
                            {/* <!-- Left Container> */}



                            {/* <!-- Right Containiner> */}
                            <Card className=' lg:w-1/2  p-3 md:p-6 flex flex-col gap-6  rounded'>
                                {/* visual data */}
                                <h1 className=' text-xl font-medium '>3. Visual Data</h1>
                                <div className='space-y-2'>
                                    <Typography className='text-xs mb-0 pb-0'>Seprate each url by a new line</Typography>
                                    <TextField
                                        required
                                        rows={5}
                                        multiline
                                        label='Images'
                                        size={'small'}
                                        value={images}
                                        fullWidth
                                        onChange={(e) => setImages(e.target.value)}
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
                                    <Button
                                        onClick={() => {
                                            setVariantData((prev) => [...prev, {
                                                color: '',
                                                size: '',
                                                price: '',
                                                images: '',
                                            }])
                                        }}
                                        className='py-2 rounded-sm '
                                    >
                                        Add Variant
                                    </Button>
                                </div>

                            </Card>
                            {/* <!-- Right Containiner> */}


                        </CardBody>

                    </form>

            }

        </>
    )
}

export default ProductForm