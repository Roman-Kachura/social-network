import {instance} from "./users-api";

export const dialogsApi = {
    getDialogs() {
        return instance.get(`/dialogs`);
    },
    startOrRefreshDialogs(userID: number) {
        return instance.put(`/dialogs/${userID}`);
    },
    getMessages(userID: number, pageSize: number, count: number) {
        return instance.get(`dialogs/${userID}/messages?count=${pageSize}&page=${count}`);
    },
    sendMessages(userID: number, body: string) {
        return instance.post(`dialogs/${userID}/messages`, {body: body});
    },
    checkIsViewedMessage(messageID: string) {
        return instance.get<boolean>(`dialogs/messages/${messageID}/viewed`).then(res => res.data);
    },
    removeMessage(messageID: string) {
        return instance.delete(`dialogs/messages/${messageID}`)
    },
    addMessageToSpam(messageID: string) {
        return instance.post(`dialogs/messages/${messageID}/spam`);
    },

    getNewMessages() {
        return instance.get('dialogs/messages/new/count');
    },
    getNewestMessages(userID: number, date: string) {
        console.log(`dialogs/${userID}/messages/new?newerThen=${date}`)
        return instance.get(`dialogs/${userID}/messages/new?newerThen=${date}`)
    },
    restoreMessage(messageID: string) {
        return instance.put(`dialogs/messages/${messageID}/restore`);
    }
}