import { useState } from "react";
import ChatRoomCard from "./ChatRoomCard";
import AddIcon from "@mui/icons-material/Add";

export const ChatRooms = () => {
  const [chatRoom, setChatRoom] = useState([
    {
      key: null,
      title: "",
      members: null,
    },
  ]);

  function addNewRoom() {
    setChatRoom((prevRooms) => {
      const newRoom = {
        key: Date.now(),
        title: `Room ${prevRooms.length + 1}`,
        members: Math.floor(Math.random() * 100),
      };
      return [...prevRooms, newRoom];
    });
  }
  const deleteRoom = (roomKeyToDelete) => {
    setChatRoom((prevRooms) =>
      prevRooms.filter((room) => room.key !== roomKeyToDelete)
    );
  };
  console.log(chatRoom);
  return (
    <div>
      <div className="flex flex-row justify-center m-5 items-center text-center bg-gray-500 w-1/7 h-10 rounded-full p-5">
        <button className="hover:cursor-pointer" onClick={addNewRoom}>New Room <AddIcon />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      {chatRoom.map((room) => {
        if (room.key === null) return null;
        return (
          <ChatRoomCard
            key={room.key}
            title={room.title}
            members={room.members}
            onDelete={() => deleteRoom(room.key)}
          />
        );
      })}
      </div>
    </div>
  );
};
export default ChatRooms;
