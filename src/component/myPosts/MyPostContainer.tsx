import React from "react";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {RootReducerType} from "../../store/store";
import {
    addPostAC,
    changeTextAC,
    changeTitleAC, PostsStateType,
    PostType,
    removePostAC
} from "../../store/posts-reducer";
import {Dispatch} from "redux";

interface MyPostsContainerProps {
    posts:PostsStateType
    addPost: (title: string, text: string) => void
    removePost: (id: number) => void
    changeTitle:(id: number, title: string) => void
    changeText:(id: number, text: string) => void
}

type MapDispatchType = {
    addPost:(title: string, text: string) => void
    removePost:(id: number) => void
    changeTitle:(id: number, title: string) => void
    changeText:(id: number, text: string) => void
}

type MapStateType = {
    posts:PostType[]
}

class MyPostsClass extends React.Component<MyPostsContainerProps> {
    render() {
        console.log(this.props);
        return <MyPosts {...this.props}/>;
    }
}

const mapStateToProps = (state: RootReducerType): MapStateType => {
    return {
        posts:state.posts
    }
}

const mapDispatchToProps = (dispatch: Dispatch):MapDispatchType => {
    return {
        addPost(title: string, text: string) {
            dispatch(addPostAC(title, text));
        },

        removePost(id: number) {
            dispatch(removePostAC(id));
        },

        changeTitle(id: number, title: string) {
            dispatch(changeTitleAC(id, title));
        },

        changeText(id: number, text: string) {
            dispatch(changeTextAC(id, text));
        }
    }
}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPostsClass);