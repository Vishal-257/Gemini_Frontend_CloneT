import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from '@mui/icons-material/Delete';
import LoginIcon from '@mui/icons-material/Login';

export const ChatRoomCard = (props: any) => {
  return (
    <div className="w-35 h-35 hover:scale-105 ease-in-out transition bg-blue-300 flex justify-center text-center rounded-3xl">
      <div className="flex flex-col gap-5 p-5">
        <div className="m-auto">
        <h1>{props.title}</h1>
        <div>
          <p>
            {props.members} <PeopleIcon />
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-3 m-auto">
        <button className="hover:cursor-pointer hover:text-red-500" onClick={props.onDelete}><DeleteIcon/></button>
        <a className="hover:cursor-pointer hover:text-green-800" href="/Room"><LoginIcon/></a>
      </div>
      </div>
    </div>
  );
};
export default ChatRoomCard;
