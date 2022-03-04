import React, {useState} from "react";
import s from './MyPosts.module.css';
import {EditableItem} from "../feature/EditableItem";

type PostPropsType = {
    id: number,
    title: string,
    text: string
    removePostCallBack: (id: number) => void
    changeTitleCallBack: (id: number, title: string) => void
    changeTextCallBack: (id: number, title: string) => void
}

export const Post = ({id, title, text, ...props}: PostPropsType) => {
    let [editMode, setEditMode] = useState(false);
    const removePost = () => {
        props.removePostCallBack(id);
    }

    const changeTitle = (newTitle: string) => {
        props.changeTitleCallBack(id, newTitle);
    }

    const changeText = (newText: string) => {
        props.changeTextCallBack(id, newText);
    }

    const toggleEditMode = () =>{
        if(title.trim() && text.trim()){
            setEditMode(!editMode);
        }
    }
    return (<div className={'block ' + s.postsItem} key={id}>
        <div className={s.postsItemContent}>
            {<h6 className={s.postTitle}>
                <EditableItem
                    editMode={editMode}
                    value={title}
                    onChangeCallBack={changeTitle}
                />
            </h6>}
            <div>
                <EditableItem editMode={editMode} value={text} onChangeCallBack={changeText}/>
            </div>
        </div>

        <div className={s.btnsBlock}>
            <button onClick={toggleEditMode}>Edit post</button>
            <button className={s.deletePost} onClick={removePost}>X</button>
        </div>

    </div>)
}