import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import productData from '../assets/productData.json'

export default function QrGenerator() {

  const [amount, setAmount] = useState(0)
  const [qrCode, setQrCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const [url, setUrl] = useState('')

    // const generateQrCode = async (e) => {
    //   e.preventDefault()
    //   setLoading(true)
    //   setQrCode('')
    //   setTimeout(async () => {
    //     setLoading(false)
    //     const qrCode = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H' })
    //     setQrCode(qrCode)
    //   }, 2500)
    // }

    const setUri = (e) => {
      e.preventDefault()
      setAmount(e.target.name)
      setUrl(`upi://pay?pa=tanishqsoni0309@oksbi&pn=TanishqSoni&am=${e.target.name}`)
      console.log("uri part",url)
    }

    useEffect(() => {
      console.log(url)
      if(url!=='') {  
        setLoading(true)
        setQrCode('')
        setTimeout(async () => {
          setLoading(false)
          const qrCode = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H' })
          setQrCode(qrCode)
          setPopUp(true)
        }, 2500)
      }
      else{
        console.log("coming here")
      }
    }, [url])


    console.log(productData)
    
      // rgb(34 197 94 / 50%)
    
      return (
        <>
        <div className="w-full h-[100vh] bg-slate-950 flex flex-col items-center p-4">
          {/* <h1 className='text-white m-7 text-3xl text-bold'>Qr Code Generator</h1>
          <form className='flex flex-col p-5 w-full md:w-1/4 sm justify-center items-baseline' onSubmit={generateQrCode}>
            <label htmlFor="url" className='text-white mr-3'>Enter URL<span className='text-red-600'>*</span></label>
            <input type="text" name="text" id="url" placeholder="Eg. https://www.google.com" className="form-control p-2 rounded-lg w-full mt-2" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button type="submit" className="btn w-full bg-green-500 mt-3 p-2 rounded-lg">Generate</button>
          </form> */}
    
        <div className="flex flex-col items-center">
          {/* {loading && <div className="loader mt-6"></div>} */}
          {/* {qrCode && 
          (
           <>
          <img src={qrCode} alt="QR Code" className='w-[20rem] rounded-md' />
          <a href={qrCode} download="qr-code.png" className="btn bg-green-500 mt-3 p-2 rounded-lg">Download</a>
           </> 
          )
          } */}
          </div>

          <div className="flex justify-between flex-wrap">
        {productData && productData.map((product, index) => {
          return (
            <div key={index} className="flex flex-col items-center mt-5 md:mx-4 group border border-green-500 p-3 hover:bg-slate-50 hover:cursor-pointer rounded-md w-full">
              <h1 className='text-white my-3 text-3xl text-bold group-hover:text-slate-950'>{product.productName}</h1>
              <button onClick={setUri} className='btn w-full bg-green-500 mt-3 p-2 rounded-lg group-hover:bg-slate-950 group-hover:text-white' name={product.price}>Purchase ₹{product.price}</button>
            </div>
          )
        })}
          </div>
        </div>

        {(loading || popUp) && 
        (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg">
            {loading && <div className="loader m-6"></div>}
              {popUp && (
                <>
              <h1 className='text-2xl'>Scan QR or Pay Using <span className='font-bold text-slate-950'>Pay<span className='text-blue-400'>TM</span></span></h1>
              <img src={qrCode} alt="QR Code" className='w-[20rem] rounded-md' />
              <h1 className='text-xl mt-3 ml-1'>Amount: ₹{amount}</h1>
              <div className="flex">
                <a href={url} className="btn bg-green-500 mt-3 p-2 rounded-sm w-full text-center mx-1">Pay</a>
                <button onClick={() => {
                  setPopUp(false)
                  setUrl('')
                }} className="btn border border-green-500 mt-3 p-2 rounded-sm w-full text-center mx-1">Close</button>
              </div>
                </>
              )}
            </div>
          </div>
        )}
        </>
        )
}