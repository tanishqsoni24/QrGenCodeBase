import React, { useState } from 'react'
import QRCode from 'qrcode'

export default function QrGenerator() {

  const [url, setUrl] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [loading, setLoading] = useState(false)

    const generateQrCode = async (e) => {
        e.preventDefault()
        setLoading(true)
        setQrCode('')
        setTimeout(async () => {
          setLoading(false)
          const qrCode = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H' })
          setQrCode(qrCode)
        }, 2500)
      }
    
      // rgb(34 197 94 / 50%)
    
      return (
        <>
        <div className="w-full h-[100vh] bg-slate-950 flex flex-col items-center">
        <h1 className='text-white m-7 text-3xl text-bold'>Qr Code Generator</h1>
        <form className='flex flex-col p-5 w-full md:w-1/4 sm justify-center items-baseline' onSubmit={generateQrCode}>
          <label htmlFor="url" className='text-white mr-3'>Enter URL<span className='text-red-600'>*</span></label>
          <input type="text" name="text" id="url" placeholder="Eg. https://www.google.com" className="form-control p-2 rounded-lg w-full mt-2" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button type="submit" className="btn w-full bg-green-500 mt-3 p-2 rounded-lg">Generate</button>
        </form>
    
        <div className="flex flex-col items-center mt-5">
          {
            loading && <div className="loader mt-6"></div>
          }
          {qrCode && 
          (
           <>
          <img src={qrCode} alt="QR Code" className='w-[20rem] rounded-md' />
          <a href={qrCode} download="qr-code.png" className="btn bg-green-500 mt-3 p-2 rounded-lg">Download</a>
           </> 
          )
          }
          </div>
        </div>
        </>
        )
}