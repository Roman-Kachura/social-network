import {RootReducerType} from "./store";

export const loadLocalStorageState =  () => {
    try{
        const initializedState = localStorage.getItem('app-state');
        if(initializedState === null){
            return undefined;
        }
        return JSON.parse(initializedState);
    }
    catch {
        return undefined;
    }
}

export const  saveLocalStorageState = (state:RootReducerType) => {
    try{
        const initializedState = JSON.stringify(state);
        localStorage.setItem('app-state',initializedState);
    } catch {

    }
}