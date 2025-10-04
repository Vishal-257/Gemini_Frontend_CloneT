import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryIcon from '@mui/icons-material/History';
import ChatRooms from "./ChatRooms";
const ChatSection = () => {
  return (
    <div>
      <div className="bg-gray-950 text-white flex flex-row">
        <nav className="flex bg-gray-900 text-gray-400 flex-col h-screen w-1/15 hover:w-1/6 ease-in-out duration-300">
          <div className="flex flex-row gap-5">
            <MenuIcon className="mt-5 ml-5 hover:cursor-pointer" />
          </div>
          <div className="flex flex-col gap-7 mt-10 ml-5 hover:cursor-pointer">
            <p><HistoryIcon/> History</p>
            <p>Room: 1</p>
            <p>Room: 2</p>
            <p>Room: 3</p>
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
          <ChatRooms />
        </div>
        
      </div>
    </div>
  );
};

export default ChatSection;
