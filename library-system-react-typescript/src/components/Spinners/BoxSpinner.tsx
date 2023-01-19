import React from 'react'
import '../../assets/css/BoxSpinner.css'
type Props = {}

const BoxSpinner = (props: Props) => {
  return (
    <div className='flex max-h-screen w-full' id='spinner'>
        <div style={{  margin: 'auto' }} className='h-full'>
            <div className="spinner" style={{display: "block", margin: "0 auto", marginTop: "150px"}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div> 
  )
}

export default BoxSpinner