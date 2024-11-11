import React from 'react'
import { Link } from 'react-router-dom'
import { 
    useState,
    useEffect
 } from 'react'
import LoaderPulse from './LoaderPulse'
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdOutlineDeleteForever } from "react-icons/md";
import moment from 'moment';
import { FaSearch } from "react-icons/fa";




const NotesGrid = ({isArchived=false, title="NOTES"}) => {
    const [notes, setNotes] = useState([])
    const [loading,setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const data = notes?.filter((item,i) => item.archived == isArchived)
    const navigate = useNavigate()
    const [del, setDeleting] = useState(false)
    const url = "api/notes/"

    useEffect(() => {
        fetchnotes()
    },[])

    

    let fetchnotes = async () => {
        const res = await fetch(`${url}`, {
            headers : {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setNotes(data)
        setLoading(false)
    }
    
    let deleteNote = async (id) => {
        setDeleting(true)
        await fetch(`${url + id}/`, {
          method: "DELETE",
        })
        setDeleting(false)
        window.location.reload();

      }

  return (
    <div className={`mb-10 ${data.length<5 ? "h-[100vh]" : ""}`}>
        <div className='flex flex-col mb-10 items-center justify-center'>
            <h1 className='text-white font-semibold font-albert text-center text-4xl my-10'>{title}</h1>
            <div className="flex bg-gray-700 p-3 items-center rounded-xl search">
                <FaSearch className='h-8 w-8 mr-3 text-gray-300'/>
                <input type="text" className='text-2xl rounded-xl p-3 text-gray-800 bg-gray-300' onChange={(e) => setSearch(e.target.value)}/>
            </div>
        </div>
        <button className='bg-gray-600 fixed top-[45%] p-4 rounded-r-xl' onClick={(e) => navigate("/notes/new")}><FaPencilAlt  className='text-white w-10 h-10'/></button>
        {loading ? (<div className=''>
            <div className=''>
                <LoaderPulse/>
            </div>
        </div>):(
            <div>
        <div className='grid gap-4 mx-24 z-10 relative sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'>
            {data.filter((note) => {
                return search.toLowerCase() === '' ? note: note.title.toLowerCase().includes(search) || note.body.toLowerCase().includes(search)
            })?.map((note,i) => (
                <div style={{backgroundColor:note.bgcolor,}} key = {i} className={`flex flex-col max-h-full justify-between text-white  border-2 border-gray-500 rounded-xl p-5`}>
                    <Link className='h-full' to={`../notes/${note.id}`}>
                        <h1 className='m-2 text-2xl pl-4 font-bold font-albert'>{note.title}</h1>
                        <pre className='m-2 mt-4 pl-4 whitespace-pre-wrap break-words font-albert'>{note.body.length>400 ? note.body.slice(0,396)+". . .": note.body}</pre>
                    </Link>
                    <div className='flex justify-between items-center mt-10'>
                    <button onClick={() => deleteNote(note.id)} className='flex items-start z-20 ml-6' to="/"><h1 className='text-2xl font-semibold font-albert bg-red-400 p-3 rounded-xl'><MdOutlineDeleteForever className=''/></h1></button>
                        <p className='m-2 text-gray-400 text-end'>Last Updated : {moment(note.updated).format('DD/MM/YYYY HH:mm')}</p>
                    </div>
                </div>
            ))}
        </div>
        {del? (<div role="status" class="absolute flex flex-cols justify-center w-full h-full">
            <div className="loader"></div><h1 className='text-2xl text-white font-bold'>Deleting...</h1></div>):("")}
            </div>
    )}
    </div>
  )
}

export default NotesGrid


