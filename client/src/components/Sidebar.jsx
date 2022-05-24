import React, { useState } from 'react'
import arrowDown from '../images/caret-down-solid.svg'

const Sidebar = ({ workSpace, setCurrentChat }) => {

  const [ dropdownChannel, setDropdownChannel ] = useState(true);
  const [ dropdownDirect, setDropdownDirect ] = useState(true);

  return (
    <div>
      <section>
        <div>
          <button type='button' onClick={() => setDropdownChannel(!dropdownChannel)}>
            <img src={arrowDown} alt="arrow down" width="10"/>
          </button>
          <h4>Channels</h4>
        </div>
        { dropdownChannel && (
          <div>
            { workSpace.channels.filter((channel) => channel.isGroupChannel === true).map((channel) => (
              <p onClick={() => setCurrentChat(channel)} key={channel._id}># { channel.channelName }</p>
            )) }
          </div> 
        )}
      </section>
      <section>
        <div>
          <button type='button' onClick={() => setDropdownDirect(!dropdownDirect)}>
            <img src={arrowDown} alt="arrow down" width="10"/>
          </button>
          <h4>Direct messages</h4>
        </div>
        { dropdownDirect && (
          <div>
            { workSpace.channels.filter((channel) => channel.isGroupChannel === false).map((channel) => (
              <p onClick={() => setCurrentChat(channel)} key={channel._id}># { channel.channelName }</p>
            )) }
          </div>
        )}
      </section>
    </div>
  )
}

export default Sidebar