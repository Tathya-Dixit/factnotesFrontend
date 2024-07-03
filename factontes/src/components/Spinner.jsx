import React from 'react'
import { ClipLoader} from 'react-spinners'

const override = {
    display:'block',
    margin : '100px auto'
}


const Spinner = ({  loading }) => {
  return (
    <ClipLoader
        color='#aaaaaa'
        loading={loading}
        cssOverride={override}
        size={350}
        // aria-label="Loading Spinner"
        // data-testid="loader"
      />
  )
}

export default Spinner