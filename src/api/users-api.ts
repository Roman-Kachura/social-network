import axios from "axios";
import {UserType} from "../store/users-reducer";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'fc44aa55-3392-48f7-a00e-41bc59417a62'
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