import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/login'
import Admin_Layout from './admin_layout.jsx'
import AuthorRegistration from './components/AuthorRegistration'
import ConferenceCreation from './components/ConferenceCreation'
import TrackCreation from './components/TrackCreation'
import CommitteeMembersRegistration from './components/CommitteeMembersRegistration'
import PaperAllotments from './components/PaperAllotments'
import Header from './components/Header'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {listConferenceBtwDate,gellAllRoles,gellAllAuthors} from './Services/ConferenceServices'
import ReviewersRegistration from './components/ReviewersRegistration.jsx'
import Conference_Root from './components/Conference_Root.jsx'
import TopicCreation from './components/TopicCreation.jsx'
// const router=createBrowserRouter(
//   createRoutesFromElements(
//       <Route path='/' element={<Login/>}></Route>,
//       <Route path='author-registration' element={<AuthorRegistration/>}></Route>,
//       <Route path='conference-creation' element={<ConferenceCreation/>}></Route>,
//       <Route path='track-creation' element={<TrackCreation/>}></Route>,
//       <Route path='committee-members-registration' element={<CommitteeMembersRegistration/>}></Route>,
//       <Route path='paper-review' element={<PaperAllotments/>}></Route>
//   )
// );

// const confernece_role=()=>{
//     let a,b;
//     gellAllRoles().then((Response)=>{
//        a=Response.data;
//     }).catch((err)=>{

//     })
//     listConferenceBtwDate().then((Response)=>{
//       b=Response.data;
//     }).catch((err)=>{
      
//     })
//     return {a,b};
// }
// const router=createBrowserRouter([
//   {
//     path:'/',
//     element:<Login/>
//   },
//   {
//     path:'/author-registration',
//     element:<AuthorRegistration/>,
//     loader:listConferenceBtwDate
//   },
//   {
//     path:'conference-creation',
//     element:<ConferenceCreation/>
//   },
//   {
//     path:'track-creation',
//     element:<TrackCreation/>,
//     loader:listConferenceBtwDate
//   },
//   {
//     path:'committee-members-registration',
//     element:<CommitteeMembersRegistration/>,
//     loader:listConferenceBtwDate
//   },
//   {
//     path:'paper-review',
//     element:<PaperAllotments/>,
    
//   },{
//     path:'header',
//     element:<Header/>
//   }
// ])

const router=createBrowserRouter([
  {
    path:'/',
    element:<Admin_Layout/>,
    
    children:[
      {
        path:'conference-root',
        element:<Conference_Root/>
      },
      {
       path:'paper-review',
       element:<PaperAllotments/>,
       loader:listConferenceBtwDate
      }
    ]
  },
    {
      path:'/author-registration',
      element:<AuthorRegistration/>,
      loader:listConferenceBtwDate
    },{
      path:'/create-conference',
      element:<ConferenceCreation/>
    },{
      path:'/track-creation',
      element:<TrackCreation/>,
      loader:listConferenceBtwDate
    },
    {
      path:'/committee-members-registration',
       element:<CommitteeMembersRegistration/>,
      loader:listConferenceBtwDate
    },{
      path:'/reviewers-registration',
      element:<ReviewersRegistration/>,
      loader:listConferenceBtwDate

    },{
      path:'/topic-creation',
      element:<TopicCreation/>,
      loader:listConferenceBtwDate
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
