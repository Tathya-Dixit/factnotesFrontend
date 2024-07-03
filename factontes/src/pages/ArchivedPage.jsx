import React from 'react'
import NotesGrid from '../components/NotesGrid'


const ArchivedPage = () => {
  return (
    <div className='h-full'>
      <NotesGrid isArchived={true} title='ARCHIVED NOTES' />
    </div>
  )
}

export default ArchivedPage