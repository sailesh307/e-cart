import { useState } from "react";
import AddressForm from "./AddressForm"
import PaymentMethod from "./PaymentMethod"
import { CheckBadgeIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/24/outline";

const Checkout = () => {
  // show pages Address, Payment , place order
  const list = [
    {
      id: 0,
      name: "Address",
      active: true,
    },
    {
      id: 1,
      name: "Payment",
      active: false,
    },
    {
      id: 2,
      name: "Place Order",
      active: false,
    },
  ];

  const [active, setActive] = useState(0);

  const handleActive = (id) => {
    setActive(id);
  };

  return (
    <>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Checkout</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {list.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center cursor-pointer ${item.id === active ? "text-blue-500" : ""
                  }`
                }
                onClick={() => handleActive(item.id)}
              >
                <div
                  className={`h-4 w-4 rounded-full border-2 border-blue-500 ${item.id === active ? "bg-blue-500 border-spacing-2" : ""
                    }`}
                >
                  {item.id > active ? <div></div>  : <CheckIcon className="text-blue-500" />}

                </div>
                <div
                  className={`ml-2 ${item.id === active ? "font-semibold" : ""
                    }`}
                >
                  {item.name}
                </div>
              </div>
            ))}

          </div>
        </div>
        <div className="mt-6">
          {active === 0 && <AddressForm />}
          {active === 1 && <PaymentMethod />}
        </div>
      </div>
    </>
  );
};

export default Checkout;

/* 
<div className="container mx-auto my-10">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="w-full md:w-1/2 md:mr-4">
                <AddressForm />
              </div>
              <div className="w-full md:w-1/2">
                <PaymentMethod />
              </div>
            </div>
          </div>

*/