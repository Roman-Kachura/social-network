import {instance} from "./users-api";
import {UserProfileType} from "../store/profile-reducer";

export const profileApi = {
    getUserProfile(userID:number){
        return instance.get(`/profile/${userID}`);
    },
    getUserStatus(userID:number){
        return instance.get(`/profile/status/${userID}`);
    },
    updateUserProfile(profile:UserProfileType){
        return instance.put(`/profile`,{profile});
    }
}