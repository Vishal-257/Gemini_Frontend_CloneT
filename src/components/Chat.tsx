import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import TextSection from "./TextSection";
import Conversation from "./Conversation";
import { useState } from "react";

export const Chat = () => {
    const [messages, setMessages] = useState([{
        userMessage: "Hi! I have a question about my account.",
        geminiMessage: "Hello, how can I assist you today?"
    }]);
    function addMessage() {
        return (setMessages(prevMessages => [...prevMessages, {
        userMessage: message,
        geminiMessage: "Gemini replies with an answer to "+message
    }]))
    }
    const [message, setMessage] = useState("");
  return (
    <div>
      <div className="bg-gray-950 text-white flex flex-row">
        <nav className="flex bg-gray-900 text-gray-400 flex-col h-screen w-1/15 hover:w-1/6 ease-in-out duration-300">
          <div className="flex flex-row gap-5">
            <MenuIcon className="mt-5 ml-5 hover:cursor-pointer" />
          </div>
          <div className="flex flex-col gap-7 mt-10 ml-5 hover:cursor-pointer">
            <p>Online <PeopleIcon/> </p>
            <p>Person 1</p>
            <p>Person 2</p>
            <p>Person 3</p>
          </div>
          
        </nav>
        <div className="flex mt-2 flex-col w-6/7 pl-5 gap-10 ">
          <header className="flex flex-col text-gray-400">
            <h1 className="text-4xl font-bold">Gemini</h1>
            <div className="bg-gray-900 mt-2 flex-row text-center font-bold w-1/10 hover:cursor-pointer rounded-full">
              <p>
                2.0 Flash <ArrowDropDownIcon />
              </p>
            </div>
          </header>
        </div>        
      </div>
      <Conversation userMessage={messages}/>
      <TextSection onText={setMessage} userText={message} addMessages={addMessage}/>
    </div>
  )
}
export default Chat