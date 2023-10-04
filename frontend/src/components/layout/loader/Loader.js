import { Spinner } from "@material-tailwind/react";

const Loader = () => {
    return (
        <div className=" h-72 min-w-full flex items-center justify-center">
            <Spinner />
        </div>
    )
}

export default Loader;