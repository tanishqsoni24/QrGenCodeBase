import { useState } from 'react'
import './App.css'
import QRCode from 'qrcode'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QrGenerator from './components/QrGenerator'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QrGenerator />}/>
      </Routes>
    </BrowserRouter>
  )
}