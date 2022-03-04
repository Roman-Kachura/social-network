import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";

export const MessageField = (
    {className,...props}:MessageFieldPropsType
) => {
    const [text,setText] = useState('');
    const dispatch = useDispatch();
    const onChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value);
    }
    const onClickHandler = () => {
        props.sendMessage(props.userID,text);
        setText('');
    }
    return(
        <div className={className}>
            <textarea
                onChange={onChangeHandler}
                value={text}
                placeholder={'To write a message...'}
            />
            <button onClick={onClickHandler}>
                send
            </button>
        </div>
    )
}

type MessageFieldPropsType = {
    className?:string
    sendMessage: (userID:number, body:string) => void
    userID:number
}