import React, {ChangeEvent, useState} from "react";
import s from './MyPosts.module.css';
import {Post} from "./Post";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {addPostAC, PostsStateType, removePostAC} from "../../store/posts-reducer";
import {AddItem} from "../addItem/AddItem";

type PostsPropType = {
    posts:PostsStateType
    addPost: (title: string, text: string) => void
    removePost: (id: number) => void
    changeTitle:(id: number, title: string) => void
    changeText:(id: number, title: string) => void
}


export const MyPosts = (props: PostsPropType) => {
    return (
        <div>
            <div className={'block ' + s.addPosts}>
                <AddItem addPostCallBack={props.addPost}/>
            </div>

            <div className={s.postsContainer}>
                {props.posts.map(post => <Post
                    key={post.id}
                    changeTitleCallBack={props.changeTitle}
                    changeTextCallBack={props.changeText}
                    removePostCallBack={props.removePost}
                    id={post.id} title={post.title}
                    text={post.text}
                />)}
            </div>
        </div>
    )
};