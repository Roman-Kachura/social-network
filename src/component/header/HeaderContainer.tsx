import React from "react";
import {RootReducerType} from "../../store/store";
import {authorizedTC, setLoggedInTC, setLoggedOutTC} from "../../store/auth-reducer";
import {connect} from "react-redux";
import {Header} from "./Header";
import {RequestType} from "../../api/auth-api";
import {getUserProfileTC} from "../../store/profile-reducer";

interface HeaderInterface {
    login: (data: RequestType) => void
    logout: () => void
    authorized: () => void
    loginName: null | string
    isLoggedIn: boolean
    photo: string | null
}

class HeaderContainer extends React.Component<HeaderInterface> {
    shouldComponentUpdate(nextProps: Readonly<HeaderInterface>, nextState: Readonly<{}>, nextContext: any): boolean {
        return this.props.isLoggedIn !== nextProps.isLoggedIn
            || this.props.loginName !== nextProps.loginName
            || this.props.photo !== nextProps.photo
    }

    componentDidUpdate(prevProps: Readonly<HeaderInterface>, prevState: Readonly<{}>, snapshot?: any) {
        this.props.authorized();
    }

    componentWillMount() {
        this.props.authorized();
    }


    render() {
        return <Header {...this.props}/>;
    }
}


type MapStateToPropsType = {
    loginName: null | string
    isLoggedIn: boolean
    photo: string | null
}

type MapDispatchToPropsType = {
    login: (data: RequestType) => void
    logout: () => void
    authorized: () => void
}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        loginName: state.auth.loginName,
        photo: state.auth.me.photo,
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = {
    authorized: authorizedTC,
    login: setLoggedInTC,
    logout: setLoggedOutTC,
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootReducerType>(mapStateToProps, mapDispatchToProps)(HeaderContainer);