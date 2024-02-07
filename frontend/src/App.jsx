import { useState } from 'react'
import Login from './components/login'
import AuthorRegistration from './components/AuthorRegistration'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ConferenceCreation from './components/ConferenceCreation'
import TrackCreation from './components/TrackCreation'
import CommitteeMembersRegistration from './components/CommitteeMembersRegistration'
function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/author-registration' element={<AuthorRegistration/>}></Route>
      <Route path='/conference-creation' element={<ConferenceCreation/>}></Route>
      <Route path='/track-creation' element={<TrackCreation/>}></Route>
      <Route path='/committee-members-registration' element={<CommitteeMembersRegistration/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
