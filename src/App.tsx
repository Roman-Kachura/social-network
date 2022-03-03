import React from 'react';
import './App.css';
import {Menu} from "./component/menu/Menu";
import {Route, Routes} from "react-router-dom";
import Follow from "./component/follow/Follow";
import {MyPostContainer} from "./component/myPosts/MyPostContainer";
import {UsersContainer} from "./component/users/UserContainer";
import {howShowUsersCount} from "./store/users-reducer";
import {MyProfile} from "./component/profile/MyProfile";
import ProfileContainer from "./component/profile/ProfileContainer";
import HeaderContainer from "./component/header/HeaderContainer";
import {Login} from "./component/feature/Login/Login";
import {connect} from "react-redux";
import {RootReducerType} from "./store/store";
import {RequestType} from "./api/auth-api";
import {setLoggedInTC} from "./store/auth-reducer";
import Dialogs from "./component/dialogs/Dialogs";
import Messages from "./component/dialogs/Messages/Messages";
import {getNewMessagesTC} from "./store/dialogs-reducer";

interface AppInterface {
    login: (data: RequestType) => void
    isLoggedIn: boolean
    userID: number
    newMessagesCount: number
    getNewMessages: () => void
}

class App extends React.Component<AppInterface> {
    componentWillMount() {
        this.props.getNewMessages();
    }


    componentWillUpdate() {
        this.props.getNewMessages();
    }

    render() {
        if (!this.props.isLoggedIn) {
            return (
                <div className="App">
                    <HeaderContainer/>
                    <div className='container'>
                        <Login {...this.props}/>
                    </div>
                </div>
            )
        } else {
            return <div className="App">
                <HeaderContainer/>
                <div className='container'>
                    <Menu newMessagesCount={this.props.newMessagesCount}/>
                    <main className='main'>
                        <Routes>
                            <Route path='/' element={<MyProfile id={this.props.userID}/>}/>
                            <Route path='/profile/me' element={<MyProfile id={this.props.userID}/>}/>
                            <Route path='/profile/*' element={<ProfileContainer/>}/>
                            <Route path='/posts' element={<MyPostContainer/>}/>
                            <Route path='/users' element={<UsersContainer showUsersCount={howShowUsersCount}/>}/>
                            <Route path='/follow' element={<Follow/>}/>
                            <Route path='/login' element={<Login {...this.props}/>}/>
                            <Route path='/dialogs' element={<Dialogs/>}/>
                            <Route path='/dialogs/messages/*' element={<Messages/>}/>
                        </Routes>
                    </main>
                </div>
            </div>
        }
    }
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        userID: state.auth.me.id,
        newMessagesCount: state.dialogsPage.messages.newMessagesCount
    }
}

const mapDispatchToProps: MapDispatchToPropsType = {
    login: setLoggedInTC,
    getNewMessages: getNewMessagesTC
}

type MapStateToPropsType = {
    isLoggedIn: boolean
    userID: number
    newMessagesCount: number
}

type MapDispatchToPropsType = {
    login: (data: RequestType) => void
    getNewMessages: () => void
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootReducerType>(mapStateToProps, mapDispatchToProps)(App);
