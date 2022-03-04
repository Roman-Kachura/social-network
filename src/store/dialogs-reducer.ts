import {Dispatch} from "redux";
import {dialogsApi} from "../api/dialogs-api";
import {RootReducerType} from "./store";

export const messagesPageSize = 20;
export const dialogsPageSize = 10;

let dialogsInitialState = {
    dialogs: [] as DialogType[],
    totalCountDialogs: 1,
    messages: {
        items: [] as MessageType[],
        totalCountMessages: 1,
        userID: 0,
        newMessagesCount: 0
    },
    sectionSelected: 'messages' as SectionSelectedType,
    spam: [] as MessageType[]
}

export const DialogsReducer = (state: DialogsInitialStateType = dialogsInitialState, action: DialogsReducerActionTypes): DialogsInitialStateType => {
    switch (action.type) {
        case "SET-DIALOGS":
            return {...state, dialogs: [...action.dialogs]}
        case "messages/SET-MESSAGES":
            return {...state, messages: {...state.messages, items: action.messages}}
        case "messages/CLEAR-MESSAGES":
            return {...state, messages: {...state.messages, items: []}}
        case "messages/ADD-MESSAGE":
            return {...state, messages: {...state.messages, items: [...state.messages.items, action.message]}}
        case "messages/SET-USER-ID":
            return {...state, messages: {...state.messages, userID: action.ID}}
        case "messages/SET-TOTAL-COUNT":
            return {...state, messages: {...state.messages, totalCountMessages: action.count}}
        case "messages/SET-NEW-MESSAGES-COUNT":
            return {...state, messages: {...state.messages, newMessagesCount: action.count}}
        case "messages/REMOVE=MESSAGE":
            return {
                ...state,
                messages: {...state.messages, items: state.messages.items.filter(i => i.id !== action.messageID)}
            }
        case "select/SET-SELECT":
            return {...state, sectionSelected: action.select}
        case "spam/ADD-TO-SPAM":
            return {...state, spam: [...state.spam, action.message]}
        case "spam/REMOVE-FROM-SPAM":
            return {...state,spam:state.spam.filter(m => m.id !== action.messageID)}
        case "messages/SET-VIEW":
            return {
                ...state,
                messages: {
                    ...state.messages,
                    items: state.messages.items.map(m => m.id === action.messageID ? {
                        ...m,
                        viewed: action.isViewed
                    } : m)
                }
            }
        default:
            return state;
    }
}

//Actions

const setDialogsAC = (dialogs: Array<DialogType>) => ({type: 'SET-DIALOGS', dialogs} as const);
const setMessagesAC = (messages: Array<MessageType>) => ({type: 'messages/SET-MESSAGES', messages} as const);
export const clearMessagesAC = () => ({type: 'messages/CLEAR-MESSAGES'} as const);
const setUserIdForMessageAC = (ID: number) => ({type: 'messages/SET-USER-ID', ID} as const);
const setTotalCountForMessage = (count: number) => ({type: 'messages/SET-TOTAL-COUNT', count} as const);
const addMessageAC = (message: MessageType) => ({type: 'messages/ADD-MESSAGE', message} as const);
const setNewMessagesCountAC = (count: number) => ({type: 'messages/SET-NEW-MESSAGES-COUNT', count} as const);
const setIsViewedMessage = (messageID: string, isViewed: boolean) => ({
    type: 'messages/SET-VIEW',
    messageID,
    isViewed
} as const);
const removeMessageAC = (messageID: string) => ({type: 'messages/REMOVE=MESSAGE', messageID} as const);
export const setSectionSelectAC = (select: SectionSelectedType) => ({type: 'select/SET-SELECT', select} as const);
const addMessageToSpamAC = (message: MessageType) => ({type: 'spam/ADD-TO-SPAM', message} as const);
const removeFromSpamAC = (messageID: string) => ({type: 'spam/REMOVE-FROM-SPAM', messageID} as const);

//Thunks
export const getDialogsTC = () => (dispatch: Dispatch) => {
    dialogsApi.getDialogs()
        .then(res => {
            dispatch(setDialogsAC(res.data));
        })
}
export const startOrRefreshDialogsTC = (userID: number) => (dispatch: Dispatch) => {
    dialogsApi.startOrRefreshDialogs(userID).then(res => res);
}
export const getMessagesTC = (userID: number, pageSize: number, count: number) => async (dispatch: Dispatch) => {
    dispatch(setUserIdForMessageAC(userID));

    await dialogsApi.getMessages(userID, pageSize, count)
        .then(res => {
            dispatch(setTotalCountForMessage(res.data.totalCount));
            dispatch(setMessagesAC(res.data.items));
        })
}
export const addMessagesTC = (userID: number, body: string) => (dispatch: Dispatch) => {
    dialogsApi.sendMessages(userID, body)
        .then(res => {
            dispatch(addMessageAC(res.data.data.message))
        })
}
export const checkIsViewedMessageTC = (messageID: string) => (dispatch: Dispatch) => {
    dialogsApi.checkIsViewedMessage(messageID)
        .then(res => {
            dispatch(setIsViewedMessage(messageID, res));
        })
}
export const getNewMessagesTC = () => (dispatch: Dispatch) => {
    dialogsApi.getNewMessages()
        .then(res => {
            dispatch(setNewMessagesCountAC(res.data));
        })
}
export const getNewestMessagesTC = (userID: number, date: string) => (dispatch: Dispatch) => {
    dialogsApi.getNewestMessages(userID, date)
        .then(res => {
            console.log(res);
        })
}
export const removeMessageTC = (messageID: string) => (dispatch: Dispatch) => {
    dialogsApi.removeMessage(messageID)
        .then(res => {
            dispatch(removeMessageAC(messageID));
        })
}
export const addMessageToSpamTC = (messageID: string) => (dispatch: Dispatch, getState: () => RootReducerType) => {
    const message = getState().dialogsPage.messages.items.find(m => m.id === messageID);
    if (message) {
        dialogsApi.addMessageToSpam(messageID)
            .then(res => {
                dispatch(addMessageToSpamAC(message));
                dispatch(removeMessageAC(messageID));
            })
    }
}
export const restoreMessageTC = (messageID: string) => (dispatch: Dispatch, getState: () => RootReducerType) => {
    dialogsApi.restoreMessage(messageID)
        .then(res => {
            dispatch(removeFromSpamAC(messageID));
        })
}

//Types

export type DialogsReducerActionTypes = ReturnType<typeof setDialogsAC>
    | ReturnType<typeof setMessagesAC>
    | ReturnType<typeof addMessageAC>
    | ReturnType<typeof setUserIdForMessageAC>
    | ReturnType<typeof setTotalCountForMessage>
    | ReturnType<typeof setNewMessagesCountAC>
    | ReturnType<typeof setIsViewedMessage>
    | ReturnType<typeof clearMessagesAC>
    | ReturnType<typeof removeMessageAC>
    | ReturnType<typeof setSectionSelectAC>
    | ReturnType<typeof removeFromSpamAC>
    | ReturnType<typeof addMessageToSpamAC>;

type DialogsInitialStateType = typeof dialogsInitialState;

export type DialogType = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: {
        small: null | string
        large: null | string
    }
    userName: string
}
export type MessageType = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: null
    viewed: boolean
}

export type SectionSelectedType = 'messages' | 'spam';