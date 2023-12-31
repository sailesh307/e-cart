import { useLocation } from "react-router-dom";
import data from "./footer.json";
import routeNames from "../../../constants/routeNames";

const Footer = () => {
    const location = useLocation();

    const excludedRoutes = [routeNames.SIGNIN, routeNames.SIGNUP]

    if (excludedRoutes.includes(location.pathname)) {
        return null;
    }
    return (
        <footer className="">
            <div className=" mt-4 flex flex-col w-full bg-primary-light text-sm justify-center items-center">
                {/* Back to top */}
                <div
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                    className="bg-primary/90 text-center text-white cursor-pointer w-full">
                    <h1 className="text-white p-2 ">Back to top</h1>
                </div>


                <div className="bg-primary/95 w-full grid grid-cols-2 md:grid-cols-4 p-5 capitalize text-[.8rem] font-thin gap-x-16 gap-y-12 lg:gap-36 text-white ">
                    {data.map((elem, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <h1 className="text-sm uppercase text-gray-500">{elem.menu}</h1>
                            <ul className="flex-col flex gap-2">
                                {elem.suboption.map((e, i) => (
                                    <li key={i}>
                                        <a href={e.redirect}
                                            // target="_blank" rel="noreferrer"
                                            className="hover:text-gray-400 hover:underline"
                                        >
                                            {e.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>


                <div className="border-t p-4 text-center text-white w-full bg-primary">
                    <h1>
                        © 2023 E-Cart, Inc. or its affiliates
                        <br />
                        Developed by {" "}
                        <a
                            href="https://www.linkedin.com/in/sailesh307/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            {"Sailesh"}
                        </a>

                    </h1>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
