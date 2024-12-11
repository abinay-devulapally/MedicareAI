import React, { useState } from "react";
import axios from "axios"; // Use axios for API requests
import "./chat.css";
import "./button.css";

const geminiApiKey = "AIzaSyDHX-jHVnzUslKBwKjv3DZp_qic77ZDFXM"; // Replace with your actual API key

function Symptoms() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Store chat messages
  const [inputMessage, setInputMessage] = useState(""); // User input message
  const [isTyping, setIsTyping] = useState(false); // Typing state

  // Function to toggle chat visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen && messages.length === 0) {
      sendInitialBotMessage();
    }
  };

  // Send predefined bot message when chat opens
  const sendInitialBotMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: "Gemini",
        message: "How can I help you today?",
        sentTime: "just now",
      },
    ]);
  };

  // Function to handle sending a message
  const sendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        sender: "user",
        message: inputMessage,
        sentTime: "just now",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage(""); // Clear the input box

      // Call the Gemini API to get a response
      setIsTyping(true);
      await processMessageToGemini([...messages, newMessage]);
    }
  };

  // Function to make a request to the Gemini API
  async function processMessageToGemini(chatMessages) {
    // const prompt =
    //   "You act like a doctor with knowledge on all specializations. When the user asks you about their symptoms, answer which doctor they need to consult. The response should be short.";

    const prompt = `
    You are a virtual doctor with expertise across all medical specializations. Your primary task is to help users identify which type of doctor or specialist they should consult based on their symptoms. Your responses must be short, concise, and informative. If a user says 'thank you' or 'ok thank you,' acknowledge it politely and end the conversation. If the user describes symptoms, provide a brief recommendation about which doctor they should see. Keep your responses to 1-2 sentences.
  `;

    // Combine the prompt with the user's chat history
    const updatedPrompt =
      prompt + chatMessages.map((msg) => msg.message).join(" ");

    try {
      // Make the request to the Gemini API
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
        {
          contents: [{ parts: [{ text: updatedPrompt }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseText =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from Gemini";

      // Update chat messages with the bot response
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: responseText,
          sender: "Gemini",
          sentTime: "just now",
        },
      ]);
      setIsTyping(false);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: `Error communicating with Gemini API: ${error.message}`,
          sender: "Gemini",
          sentTime: "just now",
        },
      ]);
      setIsTyping(false);
      console.error("Error communicating with Gemini API:", error);
    }
  }

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card-box">
                <h4 className="card-title">Welcome To Symptoms Detection!</h4>

                <section className="ftco-section">
                  <div className="container">
                    <div className="row justify-content-center mb-5 pb-5">
                      <div className="col-md-7 text-center heading-section ftco-animate">
                        <h1 className="mb-3">
                          <strong>Discover Our Most Visited Specialists</strong>
                        </h1>
                        <p>
                          To help find a suitable doctor for you, please click
                          the ChatBot below and provide us with your symptoms.
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={
                              process.env.PUBLIC_URL + "./images/generalist.jpg"
                            }
                            alt="Generalist"
                          />
                          <div className="card-body">
                            <h5 className="card-title border-bottom pb-3">
                              Generalist
                              <a
                                href="#"
                                className="float-right btn btn-sm btn-info d-inline-flex share"
                              >
                                <i className="fas fa-share-alt" />
                              </a>
                            </h5>
                            <p className="card-text">
                              A generalist is an internist, family physician, or
                              pediatrician who practices general medicine. They
                              treat a wide range of medical conditions,
                              including many that do not require surgery, and
                              sometimes handle obstetric care as well.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={
                              process.env.PUBLIC_URL + "./images/dermo_new.jpg"
                            }
                            alt="Dermatologist"
                          />
                          <div className="card-body">
                            <h5 className="card-title border-bottom pb-3">
                              Dermatologist
                              <a
                                href="#"
                                className="float-right btn btn-sm btn-info d-inline-flex share"
                              >
                                <i className="fas fa-share-alt" />
                              </a>
                            </h5>
                            <p className="card-text">
                              A dermatologist specializes in treating conditions
                              related to the skin, hair, and nails.
                              Dermatologists are trained to diagnose and manage
                              over 3,000 skin-related conditions.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={
                              process.env.PUBLIC_URL +
                              "./images/otorhinolaryngologist_new.jpg"
                            }
                            alt="Otolaryngologist"
                          />
                          <div className="card-body">
                            <h5 className="card-title border-bottom pb-3">
                              Otolaryngologist
                              <a
                                href="#"
                                className="float-right btn btn-sm btn-info d-inline-flex share"
                              >
                                <i className="fas fa-share-alt" />
                              </a>
                            </h5>
                            <p className="card-text">
                              An otolaryngologist, also known as an ENT
                              specialist, focuses on treating conditions
                              affecting the ears, nose, and throat. In addition
                              to medical care, they also perform head and neck
                              surgery.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Button */}
                    <button
                      className="chat-button"
                      onClick={toggleChat}
                      style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/images/chat.ico)`,
                      }}
                    ></button>

                    {/* Chat Popup */}
                    {isChatOpen && (
                      <div className="chat-popup">
                        <div className="chat-header">
                          <h4>Chat with our Specialist Guide</h4>
                          <button onClick={toggleChat} className="close-chat">
                            &times;
                          </button>
                        </div>
                        <div className="chat-body">
                          <div className="chat-messages">
                            {messages.map((message, index) => (
                              <div
                                key={index}
                                className={
                                  message.sender === "user"
                                    ? "chat-message user-message"
                                    : "chat-message bot-message"
                                }
                              >
                                <span>{message.message}</span>
                              </div>
                            ))}
                            {isTyping && (
                              <div className="chat-message bot-message">
                                <span>Typing...</span>
                              </div>
                            )}
                          </div>
                          <div className="chat-input">
                            <input
                              type="text"
                              placeholder="Type a message..."
                              value={inputMessage}
                              onChange={(e) => setInputMessage(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === "Enter" && sendMessage()
                              }
                            />
                            <button onClick={sendMessage}>Send</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Symptoms;
