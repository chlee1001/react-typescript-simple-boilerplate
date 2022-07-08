import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '#pages/home-page'

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App
