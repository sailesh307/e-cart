import React from 'react';

const PaginationComponent = ({ onPrevClick, currPage, onNextClick }) => {
    return (
        <div className="inline-flex mt-2 xs:mt-0">
            {/* Prev Button */}
            <button
                className="flex items-center justify-center px-4 h-10 text-base font-medium bg-primary text-black rounded-l hover:bg-primary-light"
                onClick={onPrevClick}
            >
                <svg
                    className="w-4 h-4 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                </svg>
                Prev
            </button>
            {/* show page number */}
            <div className="flex items-center justify-center h-10 mx-1 px-2 font-medium text-black">
                {currPage}
            </div>
            {/* Next Button */}
            <button
                className="flex items-center justify-center px-4 h-10 text-base font-medium bg-primary text-black rounded-r hover:bg-primary-light"
                onClick={onNextClick}
            >
                Next
                <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
            </button>
        </div>
    );
}

export default PaginationComponent;
