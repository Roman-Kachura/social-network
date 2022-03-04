import {
    addMessageToSpamTC,
    checkIsViewedMessageTC, getMessagesTC,
    getNewestMessagesTC, messagesPageSize,
    MessageType,
    removeMessageTC, restoreMessageTC
} from "../../../store/dialogs-reducer";
import React from "react";
import {connect} from "react-redux";
import {RootReducerType} from "../../../store/store";
import s from './Messages.module.css';
import {correctDate} from "../../../store/reselect/howNumberOfPagesReselect";

class MessageItem extends React.Component<MessagePropsType> {
    componentWillMount() {
    }

    shouldComponentUpdate(nextProps: Readonly<MessagePropsType>, nextState: Readonly<{}>, nextContext: any): boolean {
        return this.props.message.senderId !== nextProps.message.senderId
            || this.props.message.viewed !== nextProps.message.viewed
            || this.props.isSpam !== nextProps.isSpam
    }

    componentWillUpdate(nextProps: Readonly<MessagePropsType>, nextState: Readonly<{}>, nextContext: any) {
        this.props.getMessages(this.props.userID,messagesPageSize,this.props.pageCount)
    }

    addMessageToSpam() {
        if(this.props.message.senderId !== this.props.authorizedID){
            this.props.addMessageToSpam(this.props.message.id)
        }
    }

    restoreMessage() {
        this.props.restoreMessage(this.props.message.id)
        this.props.getMessages(this.props.userID,messagesPageSize,this.props.pageCount)
    }

    render() {
        let text = this.props.message.body.replace(/<br \/>/g, '\n');
        const fullDate = correctDate(this.props.message.addedAt);
        const src = this.props.message.senderId === this.props.authorizedID ? this.props.authorizedPhoto : this.props.photo;
        let finalClassName = this.props.message.senderId === this.props.authorizedID
            ? `${s.messageItem} ${s.authorized}` : `${s.messageItem}`;

        if (this.props.isSpam) {
            finalClassName += ` ${s.spam}`
        }
        return (
            <div className={finalClassName} key={this.props.message.id}>
                <div className={s.btnsBlock}>
                    <button className={s.removeMessageBtn}
                            onClick={this.props.isSpam
                                ? () => {
                                }
                                : this.addMessageToSpam.bind(this)
                            }
                    >+
                    </button>

                    <button className={s.removeMessageBtn}
                            onClick={this.props.isSpam
                                ? this.restoreMessage.bind(this)
                                : () => this.props.removeMessage(this.props.message.id)
                            }
                    >х
                    </button>
                </div>

                <div className={s.image}>
                    <img
                        src={src || 'https://vjoy.cc/wp-content/uploads/2020/12/1133ea1de4e69bd760056f2c04e90920.png'}/>
                </div>
                <div className={s.text}>
                    <h4 className={s.name}>{this.props.message.senderName}</h4>
                    <div className={s.body}>{text}</div>
                    <div className={s.date}><small>{fullDate.time} {fullDate.date}</small></div>
                    <div className={s.viewed}>{this.props.message.viewed ? <small>Просмотрено</small> :
                        <small>Не просмотрено</small>}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootReducerType): MapStateToProps => ({
    photo: state.profilePage.profile.photos.small,
    authorizedID: state.auth.me.id,
    authorizedPhoto: state.auth.me.photo,
});
const mapDispatchToProps: MapDispatchToProps = {
    checkIsViewedMessage: checkIsViewedMessageTC,
    getNewestMessages: getNewestMessagesTC,
    removeMessage: removeMessageTC,
    addMessageToSpam: addMessageToSpamTC,
    restoreMessage: restoreMessageTC,
    getMessages: getMessagesTC
};

export default connect<MapStateToProps, MapDispatchToProps, OwnPropsType, RootReducerType>
(mapStateToProps, mapDispatchToProps)(MessageItem);

//Types

type MessagePropsType = MapStateToProps & MapDispatchToProps & OwnPropsType;
type MapStateToProps = {
    photo: string | null
    authorizedID: number
    authorizedPhoto: string | null

};
type MapDispatchToProps = {
    checkIsViewedMessage: (messageID: string) => void
    getNewestMessages: (userID: number, date: string) => void
    removeMessage: (messageID: string) => void
    addMessageToSpam: (messageID: string) => void
    restoreMessage: (messageID: string) => void
    getMessages: (userID: number, pageSize: number, count: number) => void
};
type OwnPropsType = {
    message: MessageType
    isSpam?: boolean
    pageCount: number
    userID:number
}
