import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route ,RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ArchivedPage from './pages/ArchivedPage'
import NotFoundPage from './pages/NotFoundPage'
import NotesDetailPage from './pages/NotesDetailPage'
import Homered from './components/Homered'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route path='/' element={<HomePage />}/>
      <Route path='/archived' element={<ArchivedPage />}/>
      <Route path='/notes/:id' element={<NotesDetailPage />}/>
      <Route path='/home' element={<Homered />}/>
      <Route path='*' element = {<NotFoundPage />} />
    </Route>
  )
)
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
