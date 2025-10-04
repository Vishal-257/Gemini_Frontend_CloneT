import { useEffect, useState } from "react";
export const Conversation = (props: any) => {
  console.log(props.userMessage);
  return (
    <div className="text-gray-400 fixed top-0 p-2 bg-transparent w-1/2 mb-15 h-30 left-0 right-0 mx-auto">
      <div className="flex flex-col gap-5 mt-20 justify-between">
        {props.userMessage.map((message: any) => {
          
          return (
            <div>
              <div className="flex justify-end">
                <p>{message.userMessage}</p>
              </div>
              <div className="flex justify-start">
                <p>{message.geminiMessage}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Conversation;
