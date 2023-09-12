import React from 'react'

const Loading = () => {
  return (
    <div className="fixed flex justify-center items-center w-screen h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-700" />
    </div>
  )
}

export default Loading;