import React, { useState, useEffect, useRef } from 'react'
import { GetTimestamp, UpdateQuery } from './CacheFunctions'
import { CompareDates } from './DateFunctions'
import { config } from './config'
const DELAY = config.url.DELAY

// var delay = config.url.DELAY
const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 10000
  
}


const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,.7)',
  zIndex: 1000
  
}

const RIGHT_BUTTON = {
  position: 'absolute',
  bottom: 10,
  left: 10
}

const LEFT_BUTTON = {
  position: 'absolute',
  bottom:10,
  right:10
}

export default function Modal () {
  const [timeLeft, setTimeLeft] = useState(999)
  const [display, setDisplay] = useState(true)
  const [time, setTime] = useState(CompareDates(window.localStorage.getItem('Timestamp')))
  var inputRef = useRef()
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  })
  
  useEffect(() => {
    if (!timeLeft) {
      GetTimestamp().then(result => { setDisplay(result); if (!result) setTimeLeft(DELAY) })
      if (display) inputRef.current.focus();
      return
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [timeLeft])
  
  
  const useKeyboardShortcut = (event ) => {
    if (event.key === 'Enter'){
      console.log('enter press here!')
    }
  }

  const clickHandler = (value) => {
    setDisplay(false);
    window.localStorage.setItem('wasDeclined', value);
    if (!value){
      setTimeLeft(DELAY);
      UpdateQuery();
    }
  }
  
	const handleAnswerChange = (event) =>{
		if(event.key === 'Enter'){
			alert('ENTER pressed')
	  } else if (event.key === 'Escape') {
			alert('ESC pressed')
	  }
  }

  if (!display) {
    return null
  }
  
  return (
    <React.Fragment>
      <div style={OVERLAY_STYLES}/>
      <div style={MODAL_STYLES}>
        <p>There is new data available, would you like to download now? It has been <text style={{fontWeight: "bold"}}> {time}</text> days since you last updated your data</p>
        <button onClick={() => { clickHandler(true)}} style={RIGHT_BUTTON} size = 'lg'> Not Right Now</button>
        <button onClick={() => { clickHandler(false)}} style={LEFT_BUTTON} size = 'lg' className='btn-primary' ref={inputRef} onKeyPress={handleAnswerChange}>  Download Updated Data</button>
      </div>
    </React.Fragment>
  )
}