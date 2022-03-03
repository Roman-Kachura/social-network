import {instance} from "./users-api";

export const authApi = {
    loginName(){
        return instance.get('/auth/me');
    },
    login(data:RequestType){
        return instance.post('/auth/login',data);
    },
    logout(){
        return instance.delete('/auth/login');
    }
}

export type RequestType = {
    email:string
    password:string
    rememberMe?:boolean
    captcha?:string
}