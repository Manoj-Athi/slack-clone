import React, { useState, useContext } from "react";
// import { useSelector } from 'react-redux';
import { ModalContext } from "../Contexts/ModalContext";

import arrowDown from "../images/caret-down-solid.svg";

const Sidebar = ({ workSpace, setCurrentChat, slideIn }) => {
  const [dropdownChannel, setDropdownChannel] = useState(true);
  const [dropdownDirect, setDropdownDirect] = useState(true);
  const { setModalState } = useContext(ModalContext);

  // const user = useSelector((state) => state.UserReducer)

  const handleModal = () => {
    setModalState({
      type: "SET_MODAL_DATA",
      payload: {
        show: true,
        title: "Create a channel",
        isGroupChannel: true,
      },
    });
  };

  const handleDirectModal = () => {
    setModalState({
      type: "SET_MODAL_DATA",
      payload: {
        show: true,
        title: "Create a Direct channel",
        isGroupChannel: false,
      },
    });
  };

  return (
    <div
      className={`absolute translate-x-[${
        slideIn ? "-100%" : "0%"
      }] md:static md:translate-x-0 z-10 flex h-[calc(100vh_-_58px)] w-[14rem] flex-col space-y-2 border-r-2 border-gray-200 bg-[#4a154b] text-white p-4 transition`}
    >
      <h1 className="font-semibold text-2xl capitalize">
        {workSpace?.workSpaceName}
      </h1>
      <section className="py-2">
        <div className="flex items-center py-1">
          <button
            type="button"
            onClick={() => setDropdownChannel(!dropdownChannel)}
          >
            <img src={arrowDown} alt="arrow down" width="10" />
          </button>
          <h4 className="pl-2">Channels</h4>
        </div>
        {dropdownChannel && (
          <div>
            {workSpace.channels
              .filter((channel) => channel.isGroupChannel === true)
              .map((channel) => (
                <p
                  onClick={() => setCurrentChat(channel)}
                  key={channel._id}
                  className="py-1 cursor-pointer"
                >
                  # {channel.channelName}
                </p>
              ))}
          </div>
        )}
        <div>
          <button
            className="text-slate-300 text-sm cursor-pointer"
            onClick={handleModal}
          >
            Add Channels
          </button>
        </div>
        {/* {
            popupChannel &&  (
              <ModalForm channelName={channelName} setChannelName={setChannelName} searchVal={searchVal} setSearchVal={setSearchVal} setPopupChannel={setPopupChannel}>
                <h1>Create a channel</h1>
              </ModalForm>
            )
          } */}
      </section>
      <section className="py-2">
        <div className="flex items-center py-1">
          <button
            type="button"
            onClick={() => setDropdownDirect(!dropdownDirect)}
          >
            <img src={arrowDown} alt="arrow down" width="10" />
          </button>
          <h4 className="pl-2">Direct messages</h4>
        </div>
        {dropdownDirect && (
          <div>
            {workSpace.channels
              .filter((channel) => channel.isGroupChannel === false)
              .map((channel) => (
                <p
                  onClick={() => setCurrentChat(channel)}
                  key={channel._id}
                  className="py-1 cursor-pointer"
                >
                  # {channel.channelName}
                </p>
              ))}
          </div>
        )}
        <div>
          <button
            className="text-slate-300 text-sm cursor-pointer"
            onClick={handleDirectModal}
          >
            Add Direct Messages
          </button>
          {/* {
            popupDirect &&  (
            <div>
              <h3>Create a direct chat</h3>
              <p>Name</p>
              <input type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)}/>
              <input type="submit" onClick={handleAddDirect}/>
            </div>)
          } */}
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
