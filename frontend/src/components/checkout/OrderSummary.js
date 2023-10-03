import React from 'react';
import ShowCartItems from '../cart/ShowCartItems';

const OrderSummary = ({ nextPage}) => {
    const handleContinue = () => {
        nextPage();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:max-w-2xl">
                {/* Header */}
                <div className="bg-gray-200 text-center py-4">
                    <h1 className="text-2xl font-semibold">Order Summary</h1>
                </div>

                {/* Order Items */}
                <ShowCartItems />

                {/* Checkout Button */}
                <div className="p-6">
                    <button onClick={handleContinue} className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
