import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import LoaderBox from '../components/LoaderBox'
import { IoCaretBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { MdOutlineUnarchive, MdSavings } from "react-icons/md";
import { MdArchive } from "react-icons/md";
import { GiSave } from "react-icons/gi";
import autosize from 'autosize'



const NotesDetailPage = () => {
  const navigate = useNavigate()
  const id = useParams().id
  const [note, setNote] = useState([])
  const [loading, setLoading] = useState(true)
  const [save, setSaving] = useState(false)
  const [isArchived,setIsArchived] = useState(false)
  const url = "https://factnotesbackend.onrender.com/api/notes/"

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
          Accept: 'application/json',  
          'Content-Type': 'application/json'
        }
    })
      const data = await res.json()
      setNote(data)
      setIsArchived(data.archived)
      setLoading(false)
    }
  }

  let updateNote = async (b) => {
    setSaving(true)
    await fetch(`${url + id}/`, {
      method: 'PUT',
      headers: {
        
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...note,"archived":isArchived})
    })
    setSaving(false)
    handleNavigate(b)
  }

  let createNote = async (b) => {
    setSaving(true)
    await fetch(`${url}`, {
      method: 'POST',
      headers: {
        
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...note,"archived":isArchived})
    })
    setSaving(false)
    navigate('/')
    handleNavigate(b)

  }


  const handleNavigate = (b=false) => {
    if(b){
      if(note.isArchived){
        navigate('../archived')
      }
      else{
        navigate('/')
      }
    }
  }
    const handleBack = () => {
      if(id == "new"){
        if(note.length != 0){
          createNote(true)
        }
        else{
          navigate('/')
        }
      }
      else{
        updateNote(true)
      }
      
    }


    const handleSave = () => {
      if(id == "new"){
        if(note.length != 0){
          createNote()
        }
        else{
          null
        }
      }
      else{
        updateNote()
      }
      
    }
    const handleArchive = () => {
      setIsArchived(!isArchived)
    }
    function autoResize(element) {
      autosize(document.querySelectorAll('textarea'));
  }
    return (
      <div className='text-white p-4 flex items-center justify-center'>
        {loading ? (<div className='w-2/5'>
          <LoaderBox />
        </div>) :
          (<div className='flex flex-col m-5 justify-between text-white bg-gray-700 border-2 border-gray-500 rounded-xl p-5 sm:w-full md:w-4/5 lg:w-2/3 xl:w-2/5'>
            <div className='flex justify-between mb-10 mt-3'>
              <button onClick={() => handleBack()} className='flex items-center mx-3' to="/"><IoCaretBack className='w-7 h-7 text-violet-300' /><h1 className='text-3xl font-semibold font-albert text-violet-300'>Back</h1></button>
              <button onClick={() => handleSave()} className='flex items-center mx-3' to="/"><GiSave className='w-7 h-7 text-violet-300' /><h1 className='text-3xl font-semibold font-albert text-violet-300 mr-8'>Save</h1></button>
            </div>
              <h3 className='flex items-center'><textarea rows={1} onKeyUp={(e) => autoResize(e)} className='overflow-hidden m-2 mt-4 bg-gray-700 outline-none text-3xl pl-4 font-bold font-albert w-full resize-none' type='text' placeholder='Title' onChange={(e) => { setNote({ ...note, 'title': e.target.value }) }} value={note?.title}></textarea></h3>
            <div>
              <textarea  className='m-3 mt-4 pl-4 text-lg bg-gray-700 font-albert outline-none border-none w-full h-[50vh] resize-none ' placeholder='Note ...' onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} value={note?.body}></textarea>
            </div>
            <div>
              <button onClick={(e) => handleArchive()} className='bg-gray-900 p-2 rounded-xl'>{isArchived ? <MdOutlineUnarchive className='w-10 h-10' />:<MdArchive className='w-10 h-10' />}</button>
              <p className='text-end text-gray-400'>Edited {note.updated}</p>
            </div>
            
            {save ? (<div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
              <div className="loader"></div><h1 className='text-xl font-bold'>Saving...</h1></div>):("")}
          </div>
        )}
      </div>
    )
  }

  export default NotesDetailPage