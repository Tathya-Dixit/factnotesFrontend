import React from 'react'
import { Link } from 'react-router-dom'
import { 
    useState,
    useEffect
 } from 'react'
import LoaderPulse from './LoaderPulse'
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const NotesGrid = ({isArchived=false, title="NOTES"}) => {
    const [notes, setNotes] = useState([])
    const [loading,setLoading] = useState(true)
    const data = notes?.filter((item,i) => item.archived == isArchived)
    const navigate = useNavigate()
    const url = "/api/notes/"

    useEffect(() => {
        fetchnotes()
    },[])

    

    let fetchnotes = async () => {
        const res = await fetch(`${url}`)
        const data = await res.json()
        setNotes(data)
        setLoading(false)
    }
    

  return (
    <div className={`mb-10 ${data.length<6 ? "h-[100vh]" : ""}`}>
        <div className='flex items-center justify-center'>
        <h1 className='text-white font-semibold font-albert text-center text-4xl my-10'>{title}</h1>
        </div>
        <button className='bg-gray-600 fixed top-[45%] p-4 rounded-r-xl'><FaPencilAlt onClick={(e) => navigate("/notes/new") } className='text-white w-10 h-10'/></button>
        {loading ? (<div className=''>
            <div className=''>
                <LoaderPulse/>
            </div>
        </div>):(
        <div className='grid gap-4 mx-24 relative sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {data?.map((note,i) => (
                <Link key = {i} to={`../notes/${note.id}`} className='flex flex-col max-h-full justify-between text-white bg-gray-700 border-2 border-gray-500 rounded-xl p-5'>
                    <div>
                        <h1 className='m-2 text-2xl pl-4 font-bold font-albert'>{note.title}</h1>
                        <pre className='m-2 mt-4 pl-4 whitespace-pre-wrap break-words font-albert'>{note.body}</pre>
                    </div>
                    <p className='m-2 text-gray-400 text-end mt-10'>Last Updated : {note.updated}</p>
                </Link>
            ))}
        </div>)}
    </div>
  )
}

export default NotesGrid


