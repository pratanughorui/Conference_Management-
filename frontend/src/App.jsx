import { useState } from 'react'
import Login from './components/login'
import AuthorRegistration from './components/AuthorRegistration'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/author-registration' element={<AuthorRegistration/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
