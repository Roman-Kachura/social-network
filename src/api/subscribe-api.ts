import {instance} from "./users-api";

export const subscribeApi = {
    checkFollow(userID:number){
        return instance.get(`/follow/${userID}`);
    },
    follow(userID:number){
        return instance.post(`/follow/${userID}`);
    },
    unfollow(userID:number){
        return instance.delete(`/follow/${userID}`);
    }
}