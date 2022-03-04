import axios from "axios";
import {UserType} from "../store/users-reducer";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'aadfdf1c-f219-4c40-a41b-811f24be2490'
    }
})

type ResponseType = {}


export const usersAPI = {
    getUsers: async (count: number, page: number) => {
        return await instance.get(`/users?count=${count}&page=${page}`);
    },
    getFollowing: async () => {
        const countUsers = 100;
        let numbersOfPage = 0;
        let following: UserType[] = [];
        await instance.get(`/users`).then(res => {
            numbersOfPage = Math.ceil(res.data.totalCount / countUsers);
        });

        for (let i = 1; i <= numbersOfPage; i++) {
            await instance.get(`/users?count=${countUsers}&page=${i}`)
                .then(res => {
                    const users: UserType[] = res.data.items;
                    following = [...following, ...users.filter(u => u.followed)]
                })
        }

        return following;
    }
}