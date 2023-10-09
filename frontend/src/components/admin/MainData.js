import React, { useEffect } from 'react'
import Chart from 'chart.js/auto';
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { Avatar, IconButton } from '@mui/material'
import Inventory from '@mui/icons-material/Inventory'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch, useSelector } from 'react-redux';
import { AdminGetUsers } from '../../state/actions/userActions';
import { Card, CardBody, CardHeader } from '@material-tailwind/react';
// import { AdminGetProducts } from '../../actions/ProductActions';

// import { AdminGetOrders } from '../../actions/OrderActions';

const adminproducts = [{
    stock: 5,
}, {
    stock: 0
}, {
    stock: 10
}];
const productCount = 3;

const orders = [
    {
        orderstatus: 'processing',
        totalprice: 1500,
        createdAt: '2022-09-01T06:00:00.000Z'
    },
    {
        orderstatus: 'delivered',
        totalprice: 2000,
        createdAt: '2022-05-01T06:00:00.000Z'
    },
    {
        orderstatus: 'cancelled',
        totalprice: 500,
        createdAt: '2023-10-01T06:00:00.000Z'
    },
    {
        orderstatus: 'processing',
        totalprice: 1000,
        createdAt: '2023-09-27T06:00:00.000Z'
    },
    {
        orderstatus: 'processing',
        totalprice: 9999,
        createdAt: '2023-10-27T06:00:00.000Z'
    }
]

const MainData = () => {


    const dispatch = useDispatch()
    // const { adminproducts, productCount } = useSelector(state => state.allProducts)
    const { users } = useSelector(state => state.allUsers)
    // const { orders } = useSelector(state => state.allOrders)

    let totalamount = orders?.reduce((total, order) => total + order.totalprice, 0);


    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const lables = ['processing', 'delivered', 'cancelled']


    const data = {
        labels: lables,
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Orders',
                data: lables.map((elem, index) => orders && orders.reduce((total, curr) => {
                    if (curr.orderstatus === elem) {
                        total++;
                    }
                    return total
                }, 0)),
                // you can set indiviual colors for each bar
                backgroundColor: [
                    'orange',
                    '#98fb98',
                    '#f1807e',
                ],
                borderWidth: 1,
                width: 1,
                height: 1

            }
        ]
    }

    let date = new Date()


    const bardata = {
        labels: months,
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: `Sales in ${date.getFullYear()}`,
                data: months.map((m, i) => orders?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear()).reduce((total, od) => total + od.totalprice, 0))
                ,
                // you can set indiviual colors for each bar
                backgroundColor: [
                    'lightblue'
                ],
                borderWidth: 1,
                borderRadius: 4

            },
            {
                label: `Sales in ${date.getFullYear() - 1}`,
                data: months.map((m, i) => orders?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear() - 1).reduce((total, od) => total + od.totalprice, 0)),
                // you can set indiviual colors for each bar
                backgroundColor: [
                    'lightgreen'
                ],
                borderWidth: 1,
                borderRadius: 4


            }
        ]
    }


    let outofstock = 0;
    adminproducts && adminproducts.forEach((elem) => {
        if (elem.stock <= 0) {
            outofstock = outofstock + 1;
        }
    })


    const piedata = {
        labels: ['stock', 'Out of stock'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Popularity of colours',
                data: [adminproducts && adminproducts.length - outofstock, outofstock],
                // you can set indiviual colors for each bar
                backgroundColor: [
                    'lightblue',
                    '#ff9ab4'
                ],
                borderWidth: 1,
                width: 1,
                height: 1

            }
        ]


    }




    useEffect(() => {
        // dispatch(AdminGetProducts())
        dispatch(AdminGetUsers())
        // dispatch(AdminGetOrders())
    }, [dispatch])

    return (
        <Card className='h-full w-full flex flex-col gap-4'>

            {/* <!-- box conatiner */}
            <CardHeader floated={false} className=' flex flex-wrap items-center md:justify-between'>
                {/* <!-- box> */}
                <div className='w-full sm:w-1/2 lg:w-1/4 flex gap-4 items-center shadow-sm bg-white text-black font-bold p-3 rounded'>
                    <IconButton sx={{ backgroundColor: '#ffe5b3' }}   >
                        <Avatar sx={{ backgroundColor: 'orange' }}>
                            <CurrencyRupeeIcon fontSize='inherit' />
                        </Avatar>
                    </IconButton>
                    <div>
                        <h1 className='text-[1rem]'>Total Revenuse</h1>
                        <h2 className='text-lg '>&#8377; {totalamount.toFixed(2)}</h2>
                    </div>
                </div>
                {/* <!-- box> */}

                {/* <!-- box> */}
                <div className='w-full  sm:w-1/2 lg:w-1/4 flex gap-4 items-center shadow-sm bg-white text-black font-bold p-3 rounded'>
                    <IconButton sx={{ backgroundColor: '#ffe1ff' }}  >
                        <Avatar sx={{ backgroundColor: 'purple' }}>
                            <ShoppingCartIcon fontSize='inherit' />
                        </Avatar>
                    </IconButton>
                    <div>
                        <h1 className='text-[1rem]'>Total Orders</h1>
                        <h2 className='text-lg '>{orders?.length}</h2>
                    </div>
                </div>
                {/* <!-- box> */}


                {/* <!-- box> */}
                <div className='w-full  sm:w-1/2 lg:w-1/4 flex gap-4 items-center bg-white shadow-sm text-black font-bold p-3 rounded'>
                    <IconButton sx={{ backgroundColor: 'lightblue' }} >
                        <Avatar sx={{ backgroundColor: ' blue' }}>
                            <Inventory fontSize='inherit' />
                        </Avatar>
                    </IconButton>
                    <div>
                        <h1 className='text-[1rem]'>Total Products</h1>
                        <h2 className='text-lg '>{productCount}</h2>
                    </div>
                </div>
                {/* <!-- box> */}


                {/* <!-- box> */}
                <div className='w-full  sm:w-1/2 lg:w-1/4 flex gap-4 items-center bg-white shadow-sm text-black font-bold p-3 rounded'>
                    <IconButton sx={{ backgroundColor: '#c0f1c0' }} >
                        <Avatar sx={{ backgroundColor: '#03c903' }}>
                            <PermContactCalendarIcon fontSize='inherit' />
                        </Avatar>
                    </IconButton>
                    <div>
                        <h1 className='text-[1rem]'>Total Users</h1>
                        <h2 className='text-lg '>{users.length}</h2>
                    </div>
                </div>
                {/* <!-- box> */}
            </CardHeader>
            {/* <!-- box conatiner */}

            <CardBody>
            {/* <!-- Chart conatiner-1> */}
            <div className='flex flex-col lg:flex-row justify-between min-w-full gap-6 '>

                <div className=' bg-white w-full lg:w-2/3 h-auto p-4 rounded-sm shadow-sm'>
                    <span className=' text-lg font-bold'>Sales Report</span>
                    <Bar data={bardata} />
                </div>

                <div className='bg-white w-full lg:w-1/3 p-4 rounded-sm shadow-sm'>
                    <span className=' text-lg font-bold'>Orders</span>
                    <Doughnut data={data}
                        options={{
                            plugins: {
                                responsive: true,
                            }
                        }}
                    />
                </div>

            </div>
            {/* <!-- Chart conatiner-1> */}


            {/* <!-- Chart container-2 --> */}
            <div className='flex flex-col lg:flex-row justify-between min-w-full gap-6'>
                <div className='bg-white w-full lg:w-2/3 h-auto p-4 rounded-sm shadow-sm'>
                    <span className='text-lg font-bold'>Sales Report</span>
                    <Bar data={bardata} />
                </div>

                <div className='bg-white w-full lg:w-1/3 p-4 rounded-sm shadow-sm'>
                    <span className='text-lg font-bold'>Products Details</span>
                    <Pie
                        data={piedata}
                        options={{
                            plugins: {
                                responsive: true,
                            }
                        }}
                    />
                </div>
            </div>
            {/* <!-- Chart container-2 --> */ }


            </CardBody>
        </Card>
    )
}

export default MainData;