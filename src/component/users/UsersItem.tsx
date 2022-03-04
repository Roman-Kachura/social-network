import React from "react";
import s from './Users.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {checkFollowUserTC, followUserTC, unfollowUserTC, UserType} from "../../store/users-reducer";
import {getUserProfileTC, getUserStatusTC} from "../../store/profile-reducer";
import {RootReducerType} from "../../store/store";
import {getMessagesTC, startOrRefreshDialogsTC} from "../../store/dialogs-reducer";


class UsersItem extends React.Component<UserItemPropsType> {
    shouldComponentUpdate(nextProps: Readonly<UserItemPropsType>): boolean {
        return this.props.isFollow !== nextProps.isFollow
    }

    onClickHandler(userID: number) {
        this.props.getUserProfile(userID);
        this.props.getUserStatus(userID);
    }

    follow() {
        this.props.follow(this.props.id);
        console.log(this.props.followings);
    }

    unfollow() {
        this.props.unfollow(this.props.id);
    }

    writeMessage() {
        this.props.startOrRefreshDialogs(this.props.id);
        this.props.getMessages(this.props.id, 20, 1);
    }

    render() {
        return (
            <div className={`block ${s.usersItem}`}>
                <div className={s.image}>
                    <NavLink
                        onClick={() => {
                            this.onClickHandler(this.props.id)
                        }}
                        title={this.props.name}
                        to={`/profile/${this.props.id}`}
                    >
                        <img
                            src={this.props.photoUrl || 'https://vjoy.cc/wp-content/uploads/2020/12/1133ea1de4e69bd760056f2c04e90920.png'}/>
                    </NavLink>

                </div>
                <div className={s.description}>
                    <NavLink
                        onClick={() => {
                            this.onClickHandler(this.props.id)
                        }}
                        className={s.userName}
                        title={this.props.name}
                        to={`/profile/${this.props.id}`}
                    >
                        {this.props.name}
                    </NavLink>
                    <div className={s.buttonsBlock}>
                        {this.props.isFollow
                            ? <button className={s.followBtn} onClick={this.unfollow.bind(this)}>
                                Unfollow
                            </button>
                            : <button className={s.followBtn} onClick={this.follow.bind(this)}>Follow</button>
                        }
                        <NavLink
                            title=''
                            to={`/dialogs/messages/${this.props.name}`}
                            onClick={this.writeMessage.bind(this)}
                        >
                            Message
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps: MapDispatchToProps = {
    getUserProfile: getUserProfileTC,
    getUserStatus: getUserStatusTC,
    checkFollow: checkFollowUserTC,
    follow: followUserTC,
    unfollow: unfollowUserTC,
    startOrRefreshDialogs: startOrRefreshDialogsTC,
    getMessages:getMessagesTC
}

const mapStateToProps = (state: RootReducerType): MapStateToProps => ({
    followings: state.auth.followings
})


export default connect<MapStateToProps, MapDispatchToProps, OwnUserItemType, RootReducerType>(mapStateToProps, mapDispatchToProps)(UsersItem);

//Types

type UserItemPropsType = MapDispatchToProps & MapStateToProps & OwnUserItemType;

type MapDispatchToProps = {
    getUserProfile: (userID: number) => void
    getUserStatus: (userID: number) => void
    checkFollow: (userID: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    startOrRefreshDialogs: (userID: number) => void
    getMessages: (userID: number, count: number, page: number) => void
}

type MapStateToProps = {
    followings: UserType[]
}

type OwnUserItemType = {
    id: number
    photoUrl: string | null
    name: string
    isFollow: boolean
}