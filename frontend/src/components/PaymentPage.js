import React, { useState } from 'react';

const PaymentPage = () => {
    const [selectedOption, setSelectedOption] = useState('Paytm');
    const [paymentMessage, setPaymentMessage] = useState(null); // State to store the payment message

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handlePaymentSubmit = () => {
        // Simulate an API call to the backend (you should replace this with an actual API call)
        // In a real app, you would send the selected payment option to the backend
        // and receive a response with the payment message.
        // For demonstration purposes, we'll set a hardcoded message here.
        setTimeout(() => {
            const response = {
                message: 'Payment successful! Thank you for your purchase.'
            };
            setPaymentMessage(response.message);
        }, 2000); // Simulate a delay

        // You can also clear the message after a certain time if needed.
        setTimeout(() => {
            setPaymentMessage(null);
        }, 5000); // Clear the message after 5 seconds
    };

    const paymentOptions = [
        { name: 'Paytm', value: 'paytm' },
        { name: 'UPI', value: 'upi' },
        { name: 'Credit/Debit Card', value: 'card' },
        { name: 'Cash on Delivery', value: 'cod' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6">Choose Payment Method</h2>

                {/* Payment Options */}
                <div className="space-y-2">
                    {paymentOptions.map((option) => (
                        <label key={option.value} className="flex items-center  cursor-pointer hover:bg-slate-200 rounded-full">
                            <input
                                type="radio"
                                className="form-radio mx-3"
                                name="payment-option"
                                value={option.value}
                                checked={selectedOption === option.value}
                                onChange={() => handleOptionChange(option.value)}
                            />
                            <span className="text-lg">{option.name}</span>
                        </label>
                    ))}
                </div>

                {/* Payment Button */}
                <button
                    className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full"
                    onClick={handlePaymentSubmit}
                    disabled={paymentMessage !== null} // Disable the button while processing the payment
                >
                    {paymentMessage ? 'Processing...' : 'Proceed to Payment'}
                </button>

                {/* Display Payment Message */}
                {paymentMessage && (
                    <div className="mt-4 text-green-600">
                        {paymentMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;
