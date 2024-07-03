import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import LoaderBox from '../components/LoaderBox'
import { IoCaretBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { MdUnarchive } from "react-icons/md";
import { MdOutlineUnarchive } from "react-icons/md";
import { MdArchive } from "react-icons/md";



const NotesDetailPage = () => {
  const navigate = useNavigate()
  const id = useParams().id
  const [note, setNote] = useState([])
  const [loading, setLoading] = useState(true)
  const [isArchived,setIsArchived] = useState(false)
  const url = "/api/notes/"


  useEffect(() => {
    fetchNote()
  }, [])

  let fetchNote = async () => {
    if(id == "new"){
      setLoading(false)
    }
    else{
      const res = await fetch(`${url + id}`, {
        headers : {
            'Content-Type': 'application/json'
        }
    })
      const data = await res.json()
      setNote(data)
      setIsArchived(data.archived)
      setLoading(false)
    }
  }

  let updateNote = async () => {
    await fetch(`${url + id}/`, {
      method: 'PUT',
      headers: {
        
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...note,"archived":isArchived})
    })
  }

  let createNote = async () => {
    await fetch(`${url}`, {
      method: 'POST',
      headers: {
        
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note,"archived":isArchived})
    })
  }

  let deleteNote = async (a) => {
    await fetch(`${url + id}/`, {
      method: "DELETE",
    })
    if(a == true){
      navigate('../archived')
    }
    else{
      navigate('/')
    }
  }
    const handleBack = () => {
      if(id == "new"){
        if(note.length!=0){
          createNote()
        }
      }
      else{
        updateNote()
      }
      if(isArchived){
        navigate("../archived")
      }
      else{
        navigate("/")
      }
    }
    const handleArchive = () => {
      setIsArchived(!isArchived)
    }
    return (
      <div className='text-white p-4 flex items-center justify-center'>
        {loading ? (<div className='w-2/5'>
          <LoaderBox />
        </div>) :
          (<div className='flex flex-col m-5 justify-between text-white bg-gray-700 border-2 border-gray-500 rounded-xl p-5 w-2/5'>
            <div className='flex justify-between mb-10 mt-3'>
              <button onClick={() => handleBack()} className='flex items-center mx-3' to="/"><IoCaretBack className='w-7 h-7 text-orange-400' /><h1 className='text-3xl font-semibold font-play text-orange-400'>Back</h1></button>
              <button onClick={() => deleteNote(note.archived)} className='flex items-center mx-10' to="/"><h1 className='text-3xl font-semibold font-play text-orange-400'>Delete</h1></button>
            </div>
            <div>
              <h3 className='m-2 text-5xl pl-4 font-bold font-albert'><input className='bg-gray-700 outline-none' type='text' placeholder='Title' onChange={(e) => { setNote({ ...note, 'title': e.target.value }) }} value={note?.title}></input></h3>
            </div>
            <div>
              <textarea className='m-2 mt-4 pl-4 bg-gray-700 font-albert outline-none border-none w-full h-[50vh] resize-none ' placeholder='Note ...' onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} value={note?.body}></textarea>
            </div>
            <div>
              <button onClick={(e) => handleArchive()} className='bg-gray-900 p-2 rounded-xl'>{isArchived ? <MdOutlineUnarchive className='w-10 h-10' />:<MdArchive className='w-10 h-10' />}</button>
              <p className='text-end text-gray-400'>Edited {note.updated}</p>
            </div>
          </div>)}
      </div>
    )
  }

  export default NotesDetailPage