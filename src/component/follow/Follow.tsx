import React from "react";
import {RootReducerType} from "../../store/store";
import {connect} from "react-redux";
import {addFollowingTC,getFollowingTC} from "../../store/auth-reducer";
import UsersItem from "../users/UsersItem";
import {UserType} from "../../store/users-reducer";

class Follow extends React.Component<FollowInterface> {
    componentWillMount() {
        this.props.getFollowing();
    }

    shouldComponentUpdate(nextProps: Readonly<FollowInterface>, nextState: Readonly<{}>, nextContext: any): boolean {
        return this.props.followings !== nextProps.followings
    }

    componentWillUpdate(nextProps: Readonly<FollowInterface>, nextState: Readonly<{}>, nextContext: any) {
        this.props.getFollowing();
    }

    render() {
        return <div>
            {this.props.followings.map(user => {
                return (
                    <UsersItem
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        photoUrl={user.photos.small}
                        isFollow={user.followed}
                    />
                )
            })}
        </div>;
    }
}

const mapStateToProps = (state: RootReducerType): MapStateToProps => ({
    followings: state.auth.followings,
    totalCount: state.usersPage.totalCount
})

const mapDispatchToProps: MapDispatchToProps = {
    addFollowing: addFollowingTC,
    getFollowing:getFollowingTC
}

export default connect<MapStateToProps, MapDispatchToProps, {}, RootReducerType>(mapStateToProps, mapDispatchToProps)(Follow);

//Types

interface FollowInterface {
    followings: UserType[]
    totalCount: number
    addFollowing: (count: number, page: number) => void
    // addFollowing:(count: number, page: number) => void
    getFollowing: () => void
}

type MapStateToProps = {
    followings: UserType[]
    totalCount: number
}

type MapDispatchToProps = {
    addFollowing: (count: number, page: number) => void
    getFollowing: () => void
}
