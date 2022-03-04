import React from "react";
import {ThunkAction} from "redux-thunk/src/types";

export type PostType = {
    id: number
    title: string
    text: string
}

let initialState = [
    {id: 4, text: 'text 4', title: 'post 4'},
    {id: 3, text: 'text 3', title: 'post 3'},
    {id: 2, text: 'text 2', title: 'post 2'},
    {id: 1, text: 'text 1', title: 'post 1'}
]

export type PostsStateType = PostType[];

export const PostsReducer = (state:PostsStateType = initialState, action: PostsReducerActionsTypes):PostsStateType => {
    switch (action.type) {
        case 'ADD-POST':
            return [{id: 5, title: action.title, text: action.text}, ...state];
        case 'REMOVE-POST':
            return state.filter(f => f.id !== action.id);
        case 'CHANGE-TITLE':
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m);
        case 'CHANGE-TEXT':
            return state.map(m => m.id === action.id ? {...m, text: action.text} : m);
        default:
            return state;
    }
}

export type PostsReducerActionsTypes = addPostACType | removePostACType | changeTitleACType | changeTextACType;

type addPostACType = ReturnType<typeof addPostAC>;
export const addPostAC = (title: string, text: string) => ({type: 'ADD-POST', title, text} as const);

type removePostACType = ReturnType<typeof removePostAC>;
export const removePostAC = (id: number) => ({type: 'REMOVE-POST', id} as const);

type changeTitleACType = ReturnType<typeof changeTitleAC>;
export const changeTitleAC = (id: number, title: string) => ({type: 'CHANGE-TITLE', title, id} as const);

type changeTextACType = ReturnType<typeof changeTextAC>;
export const changeTextAC = (id: number, text: string) => ({type: 'CHANGE-TEXT', text, id} as const);

