import AddIcon from "@mui/icons-material/Add";
import MicNoneIcon from '@mui/icons-material/MicNone';
import SendIcon from "@mui/icons-material/Send";
export const TextSection = (props:any) => {
  return (
    <div className=" text-gray-400 fixed bottom-0 p-2 bg-transparent w-1/2 mb-15 h-30 left-0 right-0 mx-auto border-1 rounded-3xl">
      <div className="flex flex-row justify-between">
        <input
        className=" px-5 mt-4 w-full h-3/5 focus:outline-none"
        type="text"
        placeholder="Ask Gemini."
        value={props.userText}
        onChange={(e) => props.onText(e.target.value)}
      />
      <button onClick={props.addMessages}><SendIcon className="mt-4 mr-4 hover:cursor-pointer"/></button>
      </div>
      <div className="mt-7 ml-2">
        <div className="flex flex-row justify-between">
          <AddIcon className="ml-4 hover:cursor-pointer"/>
          <MicNoneIcon className="mr-5 hover:cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default TextSection;
