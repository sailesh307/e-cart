// import { Link } from "react-router-dom"
// import routeNames from "../constants/routeNames"
// import { useSelector } from "react-redux"

// /*
//   This example requires some changes to your config:
  
//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/aspect-ratio'),
//     ],
//   }
//   ```
// */
// export default function SearchPage() {
//     // get the products from the store
//     const products = useSelector((state) => state.search.results);
//     console.log('productpage', products)
//     return (
//         <div className="bg-white">
//             <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
//                 <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

//                 <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//                     {products.map((product) => (
//                         <Link
//                             key={product._id}
//                             className="group relative"
//                             to={`${routeNames.PRODUCT_OVERVIEW}/${product._id}`}>
//                             <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                                 <img
//                                     src={product.image}
//                                     alt={product.name}
//                                     className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                                 />
//                             </div>
//                             <div className="mt-4 flex justify-between">
//                                 <div>
//                                     <h3 className="text-sm text-gray-700">
//                                         {product.name}
//                                     </h3>
//                                     <p className="mt-1 text-sm text-gray-500">{'product.color'}</p>
//                                 </div>
//                                 <p className="text-sm font-medium text-gray-900">{product.price}</p>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }
