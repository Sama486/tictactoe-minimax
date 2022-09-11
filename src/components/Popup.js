import React from 'react'
import "./Popup.scss";
import { useEffect } from 'react';



const Popup = ({ trigger, setTrigger, mode, setMode }) => {
    useEffect(() => {
        setTrigger(false)
    },[mode])

    return ((trigger) && (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => setTrigger(false)}>close</button>
                <button className='changeModeBtn' onClick={mode === 'Hard' ? () => setMode('Easy') : () => setMode('Hard')}>Change Mode</button>
            </div>
            <div>
                
            </div>
        </div>
    )
    )
}

export default Popup
