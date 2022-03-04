import React from "react";
import {getUsersPageTC, checkFollowUserTC, UserType} from "../../store/users-reducer";
import {Users} from "./Users";
import {connect} from "react-redux";
import {RootReducerType} from "../../store/store";
import {getUserProfileTC, getUserStatusTC, updateUserProfileTC, UserProfileType} from "../../store/profile-reducer";

interface UsersInterface {
    users: UserType[]
    currentPageNumber:number
    totalCount: number
    showUsersCount: number
    getUsers: (count: number, page: number) => void
    getUserProfile:(userID:number) => void
    getUserStatus:(userID:number) => void
    checkFollow:(userID:number) => void
}

type MapStateToPropsType = {
    users: UserType[];
    totalCount: number
    currentPageNumber:number
}

type MapDispatchToPropsType = {
    getUsers: (count: number, page: number) => void
    getUserProfile:(userID:number) => void
    getUserStatus:(userID:number) => void
    checkFollow:(userID:number) => void
}
type OwnPropsType = {
    showUsersCount: number
}


class UsersClassComponent extends React.Component<UsersInterface> {
    componentDidMount() {
        this.props.getUsers(this.props.showUsersCount,this.props.currentPageNumber);
    }

    render() {
        return <Users {...this.props}/>
    }
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        totalCount: state.usersPage.totalCount,
        currentPageNumber:state.usersPage.currentPageNumber
    };
}

const mapDispatchToProps: MapDispatchToPropsType = {
    getUsers: getUsersPageTC,
    getUserProfile:getUserProfileTC,
    getUserStatus:getUserStatusTC,
    checkFollow:checkFollowUserTC
}

export const UsersContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootReducerType>
(mapStateToProps, mapDispatchToProps)(UsersClassComponent)