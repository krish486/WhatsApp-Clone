import React from 'react'

const RecievedMessage = ({ message, time }) => {
    return (
        <div className="flex">
            <div className="bg-white max-w-md px-4 py-2 rounded-lg shadow">
                <p>{message}</p>

                <div className="text-right text-xs text-gray-500 mt-1">
                    {new Date(time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </div>
        </div>
    )
}

export default RecievedMessage
