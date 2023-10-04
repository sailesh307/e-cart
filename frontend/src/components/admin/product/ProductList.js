import React, { useEffect, useState } from 'react'

import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from 'react-redux';

import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { fetchSellerProducts } from '../../../state/actions/productActions';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../../constants/routeNames';
import { formatRatingCount } from '../../../utils/formating';
import { Add } from '@mui/icons-material';
import Loader from '../../layout/loader/Loader';
import { enqueueSnackbar } from 'notistack';

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Category",
        value: "category",
    },
    {
        label: "Name",
        value: "name",
    },
];

const TABLE_HEAD = ["Product", "Category", "Variants", "Rating", "Rating Count", "Status", "Created On", "Updated On", ""];

const ProductList = () => {
    const { loading, error, products, totalPages, currentPage, totalProducts } = useSelector(state => state.sellerProducts)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleEdit = (id) => () => {
        const productData = products.find(product => product._id === id)
        navigate(routeNames.ADMIN_UPDATE_PRODUCT(id), { state: { productData } })
        console.log('Editing Product', id);
    }
    const [currPage, setCurrPage] = useState(currentPage);

    const [type, setType] = useState(TABS[0].value);
    const [searchInput, setSearchInput] = useState("");

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleTypeChange = (value) => {
        setType(value);
    };
    const handleSearch = () => {
        console.log('searching', searchInput, type);
        // TODO: search products

    }

    const handlePreviousPage = () => {
        if (currPage > 1) setCurrPage(currPage - 1)
    }

    const handleNextPage = () => {
        if (currPage < totalPages) setCurrPage(currPage + 1)
    }

    const TABLE_ROWS = products?.map((product) => {
        return {
            id: product._id,
            name: product.name,
            category: product.category,
            brand: product.brand,
            seller: product.seller,
            variants: product.variant.variantData.length,
            rating: product.rating,
            ratingCount: product.ratingCount,
            img: product?.commonImages[0] ?? 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
            // asign online randomly
            inStock: product.inStock || true,
            // date in dd/mm/yyyy and time in hh:mm with local time zone
            createdOn: new Date(product.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
            updatedOn: product.updatedAt ? new Date(product.updatedAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) : '',

        }
    }) ?? [];

    useEffect(() => {
        console.log('fetching products', currPage);
        dispatch(fetchSellerProducts(currPage))
    }, [dispatch, currPage])

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' })
        }
    }, [error])

    if (loading) {
        return <Loader />
    }
    return !loading && (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Product list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all products(select filter)
                        </Typography>
                    </div>
                    <div>
                        <Button size="sm">
                            {"+  "}Add Product
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value} onClick={
                                    () => { handleTypeChange(value); }
                                }>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={handleSearch} />}
                            onChange={handleSearchInput}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}{" "}
                                        {index !== TABLE_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(
                            ({ id, img, name, category, brand, variants, rating, ratingCount, inStock, createdOn, updatedOn }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={id} className="even:bg-blue-gray-50/50">
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={img} alt={name} size="sm" variant='square' />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {brand}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {category}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {variants}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {rating}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {formatRatingCount(ratingCount)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={inStock ? "in stock" : "out of stock"}
                                                    color={inStock ? "green" : "blue-gray"}
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {createdOn}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {updatedOn}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Edit Product">
                                                <IconButton variant="text" onClick={handleEdit(id)}>
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {currentPage} of {totalPages}
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm" onClick={handlePreviousPage}>
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm" onClick={handleNextPage}>
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default ProductList