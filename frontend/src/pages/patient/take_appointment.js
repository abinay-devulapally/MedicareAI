// export default Take_appointment;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AuthService from "../../services/auth.service";
import moment from "moment";
import useGeoLocation from "../../hooks/useGeoLocation";
import { useDispatch, useSelector } from "react-redux";
import { Delete_Talks, Send_Message, GetTalks } from "../../Js/actions/chatapp";
import DatePicker from "react-datetime";
import dayjs from "dayjs";

// Styled components
const Styledimg = styled.img`
  width: 40px;
  border-radius: 50% !important;
`;

const Styledbutton = styled.button`
  border-color: transparent;
  background-color: #009efb;
  color: #fff;
  width: 50px;
  border: 1px solid #009efb;
`;

function Take_appointment() {
  // Get the current user
  const currentUser = AuthService.getCurrentUser();

  // User's geolocation
  const location = useGeoLocation();

  // Redux dispatch
  const dispatch = useDispatch();

  // Get messages from Redux store
  const talks = useSelector((state) => state.chatappReducer.talks);

  // useEffect to get talks and prevent infinite loop
  useEffect(() => {
    if (currentUser?.id) {
      dispatch(GetTalks(currentUser.id));
    }
  }, [dispatch, currentUser]);

  // Search functionality
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredMessages =
    talks &&
    talks.filter(
      (talk) =>
        talk.messageSent.toLowerCase().includes(searchValue.toLowerCase()) ||
        talk.messageReceived.toLowerCase().includes(searchValue.toLowerCase())
    );

  // Display messages
  const displayMessages = filteredMessages?.map((talk) => (
    <div key={talk._id}>
      <div className="chat chat-left">
        <div className="chat-avatar">
          <Styledimg
            alt="User Avatar"
            src="assets/img/profile_new.jpg"
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="chat-body">
          <div className="chat-bubble">
            <div className="chat-content">
              <p>{talk.messageSent}</p>
              <span className="chat-time">
                {moment(talk.date).format("DD MMMM hh:mmA")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="chat chat-right">
        <div className="chat-body">
          <div className="chat-bubble">
            <div className="chat-content">
              <p>{talk.messageReceived}</p>
              <span className="chat-time">
                {moment(talk.date).format("DD MMMM hh:mmA")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  // Sending messages
  const [userMessage, setUserMessage] = useState({
    message: "",
    Userlat: "",
    Userlng: "",
    Username: "",
    Usermail: "",
    Date: "",
  });

  const handleDateChange = (date) => {
    setUserMessage({
      ...userMessage,
      Date: moment(date).toDate(),
    });
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (userMessage.message.trim() === "") {
      alert("Please enter a message.");
      return;
    }

    if (!location.coordinates.lat || !location.coordinates.lng) {
      alert("Location is not confirmed.");
      return;
    }

    dispatch(Send_Message(userMessage, currentUser.id));
    setUserMessage({
      ...userMessage,
      message: "",
    });
  };

  // When location is confirmed, save it to state and localStorage
  const confirmLocation = () => {
    if (location?.coordinates?.lat && location?.coordinates?.lng) {
      localStorage.setItem("latitude", location.coordinates.lat);
      localStorage.setItem("longitude", location.coordinates.lng);
      setUserMessage({
        ...userMessage,
        Userlat: location.coordinates.lat,
        Userlng: location.coordinates.lng,
        Username: currentUser?.username,
        Usermail: currentUser?.email,
      });
      alert("Location confirmed!");
    } else {
      alert("Location not available.");
    }
  };
  const todayDate = dayjs().format("MMMM D, YYYY");

  return (
    <div className="page-wrapper">
      <div className="chat-main-row">
        <div className="chat-main-wrapper">
          <div className="col-lg-9 message-view chat-view">
            <div className="chat-window">
              <div className="fixed-header">
                <div className="navbar">
                  <div className="user-details mr-auto">
                    <Styledimg src="assets/img/chatbot.jpg" alt="#" />
                    <div className="user-info float-left">
                      <a href="#">
                        <span className="font-bold">Appointement Chatbot</span>
                      </a>
                      <span className="last-seen">Available</span>
                    </div>
                  </div>
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                    <button className="btn" type="button">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                  <ul className="nav custom-menu">
                    <li className="nav-item dropdown dropdown-action">
                      <button
                        className="dropdown-toggle btn"
                        aria-expanded="false"
                        onClick={() => dispatch(Delete_Talks(currentUser.id))}
                      >
                        <i className="fa fa-cog" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="chat-contents">
                <div className="chat-content-wrap">
                  <div className="chat-box">
                    <div className="chats">
                      <div className="chat chat-right">
                        <div className="chat-body">
                          <div className="chat-bubble">
                            <div className="chat-content">
                              <p>
                                Hello, we need your confirmation to get your
                                location
                              </p>
                              <button
                                className="btn btn-primary"
                                onClick={confirmLocation}
                              >
                                Confirm Location
                              </button>
                              <span className="chat-time">
                                {dayjs().format("h:mm A")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="chat-line">
                        {/* Dynamically display today's date */}
                        <span className="chat-date">{todayDate}</span>
                      </div>
                      {displayMessages}
                    </div>
                  </div>
                </div>
              </div>

              <div className="chat-footer">
                <div className="message-bar">
                  <div className="message-inner">
                    <div className="message-area">
                      <textarea
                        className="form-control"
                        placeholder="Type message..."
                        value={userMessage.message}
                        onChange={(e) =>
                          setUserMessage({
                            ...userMessage,
                            message: e.target.value,
                          })
                        }
                      />
                      <DatePicker
                        className="input-group-append"
                        dateFormat="DD-MM-YYYY"
                        timeFormat="hh:mm A"
                        placeholderText="Pick a date"
                        selected={userMessage.Date}
                        onChange={handleDateChange}
                      />
                      <Styledbutton type="submit" onClick={handleSend}>
                        <i className="fa fa-paper-plane"></i>
                      </Styledbutton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 message-view chat-profile-view chat-sidebar">
            <div className="chat-window video-window">
              <div className="fixed-header">
                <ul className="nav nav-tabs nav-tabs-bottom">
                  <li className="nav-item">
                    <a className="nav-link active" href="#profile_tab">
                      Profile
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content chat-contents">
                <div className="tab-pane show active" id="profile_tab">
                  <div className="chat-profile-info">
                    <div className="chat-profile-img">
                      <Styledimg src="assets/img/profile_new.jpg" alt="" />
                      <span className="change-img">Change Image</span>
                      <h3 className="user-name">{currentUser?.username}</h3>
                      <small className="text-muted">Account VIP</small>
                    </div>
                    <ul className="user-det-list">
                      <li>
                        <span>Username:</span>
                        <span>{currentUser?.username}</span>
                      </li>
                      <li>
                        <span>Email:</span>
                        <span>{currentUser?.email}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Take_appointment;
