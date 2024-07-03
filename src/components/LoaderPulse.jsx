import React from 'react'
import LoaderBox from './LoaderBox'
import { useState } from 'react';

const LoaderPulse = () => {
    const [showDelayedText, setShowDelayedText] = useState(false);

    setTimeout(() => {
        setShowDelayedText(true)
    }, 300)

    return (
        <>
        {showDelayedText && (
            <div className='grid auto-rows-[300px] gap-4 mx-24 relative md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                    <LoaderBox/>
                    <LoaderBox/>
                    <LoaderBox/>
                    <LoaderBox/>
                    <LoaderBox/>
                    <LoaderBox/>
            </div>
        )
        }
        </>
  )
}

export default LoaderPulse