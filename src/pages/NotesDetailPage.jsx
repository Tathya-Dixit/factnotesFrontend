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
import moment from 'moment';



const NotesDetailPage = () => {
  const navigate = useNavigate()
  const id = useParams().id
  const [oldie,setOldie] = useState([])
  const [note, setNote] = useState([])
  const [loading, setLoading] = useState(true)
  const [save, setSaving] = useState(false)
  const colors = ["black", "#252525","rgb(25 25 63)" , "rgb(17 24 39)", "rgb(55 65 81)"]
  const [isArchived, setIsArchived] = useState(false)
  const [bgcolor, setBgColor] = useState("rgb(17 24 39)")
  const url = "/api/notes/"

  useEffect(() => {
    fetchNote()
  }, [])

  let fetchNote = async () => {
    if (id == "new") {
      setLoading(false)
    }
    else {
      const res = await fetch(`${url + id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      setNote(data)
      setOldie(data)
      setIsArchived(data.archived)
      setBgColor(data.bgcolor)
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
      body: JSON.stringify({ ...note, "archived": isArchived, "bgcolor": bgcolor })
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
      body: JSON.stringify({ ...note, "archived": isArchived ,"bgcolor": bgcolor  })
    })
    setSaving(false)
    navigate('/')
    handleNavigate(b)

  }


  const handleNavigate = (b = false) => {
    if (b) {
      if (isArchived) {
        navigate('../archived')
      }
      else {
        navigate('/')
      }
    }
  }
  const handleBack = () => {
    if (id == "new") {
      if (note.length != 0) {
        createNote(true)
      }
      else {
        navigate('/')
      }
    }
    else {
      if (oldie != note || bgcolor != note.bgcolor || isArchived != note.archived){
        // console.log(`oldie : ${oldie.title oldie.body} \nnote : ${note.title note.body} \nbgcolor : ${bgcolor} \nnote.bgcolor : ${note.bgcolor} \nisarchived : ${isArchived} \nnote.isarchived : ${note.archived}`)
        updateNote(true)
      }
      else{
        console.log("You've backed succesfully :)")
        handleNavigate(true)
      }
    }

  }


  const handleSave = () => {
    if (id == "new") {
      if (note.length != 0) {
        createNote()
      }
      else {
        null
      }
    }
    else {
      if (oldie != note || bgcolor != note.bgcolor || isArchived != note.archived){
        updateNote(false)
      }
      else{
        console.log("what do you want? why are you saving a saved note!!!??")
      }
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
        (<div style={{backgroundColor:bgcolor,}} className={`flex flex-col m-5 justify-between text-white  border-2 border-gray-500 rounded-xl p-5 sm:w-full md:w-4/5 lg:w-2/3 xl:w-2/5`}>
          <div className='flex justify-between mb-10 mt-3'>
            <button onClick={() => handleBack()} className='flex items-center mx-3' to="/"><IoCaretBack className='w-7 h-7 text-orange-400' /><h1 className='text-3xl font-semibold font-albert text-orange-400'>Back</h1></button>
            <button onClick={() => handleSave()} className='flex items-center mx-3' to="/"><GiSave className='w-7 h-7 text-orange-400' /><h1 className='text-3xl font-semibold font-albert text-orange-400 mr-8'>Save</h1></button>
          </div>
          <h3 className='flex items-center'><textarea style={{backgroundColor:bgcolor,}} rows={1} onKeyUp={(e) => autoResize(e)} className={`overflow-hidden m-2 mt-4 outline-none text-3xl pl-4 font-bold font-albert w-full resize-none` } type='text' placeholder='Title' onChange={(e) => { setNote({ ...note, 'title': e.target.value }) }} value={note.title != null ? note.title:""}></textarea></h3>
          <div>
            <textarea style={{backgroundColor:bgcolor,}} className={`m-3 mt-4 pl-4 text-lg font-albert outline-none border-none w-full h-[50vh] resize-none `} placeholder='Note ...' onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} value={note?.body}></textarea>
          </div>
          <div>
            <button onClick={(e) => handleArchive()} className='bg-gray-900 p-2 rounded-xl'>{isArchived ? <MdOutlineUnarchive className='w-10 h-10' /> : <MdArchive className='w-10 h-10' />}</button>
            <p className='text-end text-gray-400'>Created {moment(note.created).format('DD/MM/YYYY HH:mm')}</p>
          <div className="flex">
          {colors.map((color,index) => {
            return <div key={index} className="color relative" id=''>
              <div style={{backgroundColor:color,}} className={`w-10 h-10 border-4 border-gray-300 rounded-3xl absolute top-1 left-1`}></div>
              <input type="radio" name="bgcolor" id={color} value={color} onChange={(e) => {setBgColor(color)}} checked = {bgcolor == color} className='border-3 cursor-pointer w-10 h-10 opacity-0 m-1 accent-red-700' />
            </div>
          } )}
          </div>
          </div>
        </div>
        )}
      {save ? (<div role="status" class="absolute flex flex-cols items-center justify-center w-full h-full">
        <div className="loader"></div><h1 className='text-xl font-bold h-fit'>Saving...</h1></div>) : ("")}
    </div>
  )
}

export default NotesDetailPage