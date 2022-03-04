import React from "react";
import {connect} from "react-redux";
import {RootReducerType} from "../../../store/store";
import {
    addMessagesTC,
    clearMessagesAC,
    getMessagesTC, messagesPageSize,
    MessageType, SectionSelectedType, setSectionSelectAC,
    startOrRefreshDialogsTC
} from "../../../store/dialogs-reducer";
import MessageItem from "./MessageItem";
import s from './Messages.module.css';
import {MessageField} from "./messageField";
import {getUserProfileTC} from "../../../store/profile-reducer";
import {howNumberOfPagesReselect} from "../../../store/reselect/howNumberOfPagesReselect";


class Messages extends React.Component<MessagesPropsType, MessagesStateType> {
    constructor(props: MessagesPropsType) {
        super(props)
        this.state = {
            pageCount: 1,
            messages: []
        };
    }

    componentWillMount() {
        if (this.props.userID !== 0) {
            this.props.getUserProfile(this.props.userID);
        }
    }


    shouldComponentUpdate(nextProps: Readonly<MessagesPropsType>, nextState: Readonly<MessagesStateType>, nextContext: any): boolean {
        return this.props.userID !== nextProps.userID
            || this.props.messages !== nextProps.messages
            || this.state.pageCount !== nextState.pageCount
            || this.props.sectionSelect !== nextProps.sectionSelect
            || this.props.spam !== nextProps.spam
    }

    componentWillUpdate(nextProps: Readonly<MessagesPropsType>, nextState: Readonly<MessagesStateType>, nextContext: any) {
        if (nextState.pageCount !== this.state.pageCount) {
            this.props.getMessages(this.props.userID, messagesPageSize, nextState.pageCount)
        }
    }

    componentWillUnmount() {
        this.props.clearMessages();
    }

    showPrevMessages() {
        this.setState((state: MessagesStateType) => {
            return this.state.pageCount < howNumberOfPagesReselect({
                totalCount: this.props.messagesTotalCount,
                pagesSize: messagesPageSize
            }) ? {
                ...state,
                pageCount: state.pageCount + 1
            } : {...state, pageCount: state.pageCount};
        })
    }

    showNextMessages() {
        this.setState((state: MessagesStateType) => {
            return this.state.pageCount > 1 ? {
                ...state,
                pageCount: state.pageCount - 1
            } : {...state, pageCount: state.pageCount};
        })
    }

    onClickShowMessages(select: SectionSelectedType) {
        this.props.setSectionSelect(select);
        this.setState((state: MessagesStateType) => {
            return {
                ...state,
                pageCount: 1
            }
        })
    }

    render() {
        const maxPageSize = howNumberOfPagesReselect({
            totalCount: this.props.messagesTotalCount,
            pagesSize: messagesPageSize
        });
        let checkAreThereMessages: boolean = this.props.sectionSelect === 'messages' ? this.props.messages.length !== 0 : this.props.spam.length !== 0;
        return (
            <div className={s.messages}>
                <div className={s.nav}>
                    <button
                        className={this.props.sectionSelect === 'messages' ? s.active : ''}
                        onClick={() => {
                            this.onClickShowMessages('messages')
                        }}
                    >
                        Messages
                    </button>
                    <button
                        className={this.props.sectionSelect === 'spam' ? s.active : ''}
                        onClick={() => {
                            this.onClickShowMessages('spam')
                        }}
                    >
                        Spam
                    </button>
                </div>

                <div className={s.messagesBlock}>
                    {this.state.pageCount < maxPageSize && checkAreThereMessages &&
                    <button className={s.showPrevMessages} onClick={this.showPrevMessages.bind(this)}>
                        Показать предыдущие сообщения &#8593;
                    </button>}

                    {this.props.sectionSelect === 'messages'
                        ? this.props.messages.map(m => <MessageItem userID={this.props.userID}
                                                                    pageCount={this.state.pageCount} key={m.id}
                                                                    message={m}/>)
                        : ''
                    }
                    {this.props.sectionSelect === 'spam'
                        ? this.props.spam.map(m => <MessageItem userID={this.props.userID}
                                                                pageCount={this.state.pageCount} isSpam key={m.id}
                                                                message={m}/>)
                        : ''
                    }

                    {this.state.pageCount > 1 && checkAreThereMessages &&
                    <button className={s.showNextMessages} onClick={this.showNextMessages.bind(this)}>
                        Показать следующие сообщения &#8595;
                    </button>}

                </div>
                <MessageField userID={this.props.userID} sendMessage={this.props.sendMessage} className={s.sendField}/>
            </div>
        );
    }
}

const mapStateToProps = (state: RootReducerType): MapStateToProps => ({
    messages: state.dialogsPage.messages.items,
    userID: state.dialogsPage.messages.userID,
    messagesTotalCount: state.dialogsPage.messages.totalCountMessages,
    sectionSelect: state.dialogsPage.sectionSelected,
    spam: state.dialogsPage.spam
});
const mapDispatchToProps: MapDispatchToProps = {
    getMessages: getMessagesTC,
    sendMessage: addMessagesTC,
    getUserProfile: getUserProfileTC,
    refreshDialog: startOrRefreshDialogsTC,
    clearMessages: clearMessagesAC,
    setSectionSelect: setSectionSelectAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);

//Types

type MessagesPropsType = MapStateToProps & MapDispatchToProps;
type MapStateToProps = {
    messages: MessageType[]
    spam: MessageType[]
    userID: number
    messagesTotalCount: number
    sectionSelect: SectionSelectedType
};
type MapDispatchToProps = {
    getUserProfile: (userID: number) => void
    getMessages: (userID: number, pageSize: number, count: number) => void
    sendMessage: (userID: number, body: string) => void
    refreshDialog: (userID: number) => void
    clearMessages: () => void
    setSectionSelect: (select: SectionSelectedType) => void
};

type MessagesStateType = {
    pageCount: number
    messages: MessageType[]
}