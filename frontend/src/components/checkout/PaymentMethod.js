import React, { useState } from 'react';

function PaymentMethod() {
    const [selectedMethod, setSelectedMethod] = useState('');

    const paymentOptions = [
        { name: 'Cash On Delivery', value: 'cash-on-delivery', childCoponent: <div> Cash On Delivery </div> },
        { name: 'Credit / Debit / ATM Card', value: 'credit-card', childCoponent: <div> Credit / Debit / ATM Card </div> },
        { name: 'Wallets', value: 'wallets', childCoponent: <div> Wallets </div> },
    ];

    const handlePaymentMethodChange = (e) => {
        setSelectedMethod(e.target.value);
    };

    const handleConfirmOrder = () => {
        // Handle the order confirmation logic here
        console.log(`Confirmed order with payment method: ${selectedMethod}`);
    };

    return (
        <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
            <form>
                <div className="space-y-4">
                    {paymentOptions.map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer hover:bg-slate-200 rounded-full">
                            <input
                                type="radio"
                                className="form-radio mx-3"
                                name="payment-method"
                                value={option.value}
                                checked={selectedMethod === option.value}
                                onChange={handlePaymentMethodChange}
                            />
                            <span className="text-lg">{option.name}</span>
                        </label>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={handleConfirmOrder}
                    className={`mt-6 bg-blue-500 text-white px-4 py-2 rounded-md ${selectedMethod ? '' : 'pointer-events-none opacity-50'
                        }`}
                    disabled={!selectedMethod}
                >
                    Confirm Order
                </button>
            </form>
        </div>
    );
}

export default PaymentMethod;
