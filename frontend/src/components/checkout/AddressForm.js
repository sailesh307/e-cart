import React, { useState } from 'react';

const AddressForm = () =>{
    const [addressData, setAddressData] = useState({
        name: '',
        phoneNo: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // TODO: Add validation 

        setAddressData({ ...addressData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // TODO: add action to save address
        console.log(addressData);
    };

    return (
        <div className="bg-gray-200 shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={addressData.name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNo"
                            name="phoneNo"
                            required
                            value={addressData.phoneNo}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                            Address Line 1
                        </label>
                        <input
                            type="text"
                            id="addressLine1"
                            name="addressLine1"
                            required
                            value={addressData.addressLine1}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
                            Address Line 2
                        </label>
                        <input
                            type="text"
                            id="addressLine2"
                            name="addressLine2"
                            value={addressData.addressLine2}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            Town/City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={addressData.city}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            required
                            value={addressData.state}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                            Pincode
                        </label>
                        <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            value={addressData.pincode}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none"
                    >
                        Save Address
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddressForm;
