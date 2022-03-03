import {Textarea} from "../feature/Textarea";
import {useState} from "react";

export const SendMessage = () => {
    const [message,setMessage] = useState<string>('');
    const onChangeText = (text:string) => {
        setMessage(text);
    }

    const sendMessage = () => {

    }

  return(
      <div>
          <Textarea onChangeTextCallBack={onChangeText} text={message} addPost={sendMessage}/>
          <button>Send</button>
      </div>
  )
}