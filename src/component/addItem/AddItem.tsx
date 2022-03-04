import React, {useState} from "react";
import {Textarea} from "../feature/Textarea";
import {Input} from "../feature/Input";
import s from "../myPosts/MyPosts.module.css";

type AddItemPropsType = {
    addPostCallBack: (title: string, text: string) => void
}

export const AddItem = (props: AddItemPropsType) => {
    let [text, setText] = useState('');
    let [title, setTitle] = useState('');
    let [error,setError] = useState<string[] | []>([]);


    const onChangeTitleCallBack = (newTitle: string) => {
        setTitle(newTitle);
    }

    const onChangeTextCallBack = (newText: string) => {
        setText(newText);
    }

    const changeError = (newError:string | string[] | []) => {
        if(typeof newError === 'string'){
            let errors = [...error];
            errors.push(newError);
            setError(errors);
        }

        else {
            setError(newError);
        }
    }

    const addPost = () => {
        if (text && title){
            props.addPostCallBack(title, text);
            setError([]);
        } else{
            let errors = [];
            if(!title) errors.push('Title error!');
            if(!text) errors.push('Text error!')
            setError(errors);
        }
    }

    return (<>
        <Input
            error={error}
            addPost={addPost}
            title={title}
            onChangeTitleCallBack={onChangeTitleCallBack}
            className={s.inputBlock}
            setError={changeError}
        />
        <Textarea
            error={error}
            addPost={addPost}
            onChangeTextCallBack={onChangeTextCallBack}
            text={text}
            className={s.textareaBlock}
            setError={changeError}
        />
        <button onClick={addPost}>Add post</button>
    </>)
}