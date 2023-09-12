import React from 'react'

const Error = ({msg}) => {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <h1 className="text-2xl text-red-600">{msg ?? 'Something Went Wrong'}</h1>
        </div>
    )
}

export default Error