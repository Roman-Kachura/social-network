import {Dispatch} from "redux";
import {profileApi} from "../api/profile-api";

let initialState = {
    profile:{
        aboutMe: '',
        userId: 0,
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        contacts: {
            github: '',
            vk: '',
            facebook: '',
            instagram: '',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: '',
        },

        photos: {
            small: null,
            large: null
        }
    }
} as ProfileReducerStateType;

export const ProfileReducer = (state: ProfileReducerStateType = initialState, action: ProfileReducerActionsTypes): ProfileReducerStateType => {
    switch (action.type) {
        case "SET-USER-PROFILE":
            return {...state, profile: action.userProfile}
        case "SET-USER-STATUS":
            return {...state, status: action.userStatus}
        default:
            return state;
    }
}

//Actions
const setUserProfileAC = (userProfile: UserProfileType) => ({type: 'SET-USER-PROFILE', userProfile} as const);
const setUserStatusAC = (userStatus: any) => ({type: 'SET-USER-STATUS', userStatus} as const);

//Thunk

export const getUserProfileTC = (userID: number) => (dispatch: Dispatch) => {
    profileApi.getUserProfile(userID)
        .then(res => {
            dispatch(setUserProfileAC(res.data));
        })
}
export const getUserStatusTC = (userID: number) => (dispatch: Dispatch) =>{
    profileApi.getUserStatus(userID).then(res => {
        dispatch(setUserStatusAC(res.data));
    })
}
export const updateUserProfileTC = (profile: UserProfileType) => (dispatch: Dispatch) =>{
    profileApi.updateUserProfile(profile).then(res => {
        console.log(res);
    })
}

//Types
export type ProfileReducerStateType = {
    profile: UserProfileType
    status: any
}

export type UserProfileType = {
    aboutMe: string | null
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }

    photos: {
        small: string | null
        large: string | null
    }
}
export type ProfileReducerActionsTypes = ReturnType<typeof setUserProfileAC> | ReturnType<typeof setUserStatusAC>;
