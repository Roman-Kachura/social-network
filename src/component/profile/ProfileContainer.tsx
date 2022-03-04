import React from "react";
import {getUserProfileTC, updateUserProfileTC, UserProfileType} from "../../store/profile-reducer";
import {RootReducerType} from "../../store/store";
import {Profile} from "./Profile";
import {connect} from "react-redux";

interface ProfileInterface {
    profile:UserProfileType
    status:any
    getUserProfile:(userID:number) => void
    updateUserProfile:(profile:UserProfileType) => void
    userID?:number
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        profile:state.profilePage.profile,
        status:state.profilePage.status
    };
}

const mapDispatchToProps: MapDispatchToPropsType = {
    getUserProfile:getUserProfileTC,
    updateUserProfile:updateUserProfileTC
}

class ProfileContainer extends React.Component<ProfileInterface> {
    componentWillMount() {
        if(this.props.userID){
            this.props.getUserProfile(this.props.userID);
        }
    }

    render() {
        return <Profile {...this.props}/>;
    }
}

//Types 

type MapStateToPropsType = {
    profile:UserProfileType
    status:any
}

type MapDispatchToPropsType = {
    getUserProfile:(userID:number) => void
    updateUserProfile:(profile:UserProfileType) => void
}

export default connect<MapStateToPropsType,MapDispatchToPropsType,{userID?:number},RootReducerType>
(mapStateToProps,mapDispatchToProps)(ProfileContainer)