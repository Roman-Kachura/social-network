import React from "react";
import style from './Header.module.css';

type HeaderPropsType = {
    loginName: null | string
    logout:() => void
    isLoggedIn:boolean
    photo: string | null
}

export const Header = (props:HeaderPropsType) => {
    const url = props.photo !== null ? props.photo : 'https://vjoy.cc/wp-content/uploads/2020/12/1133ea1de4e69bd760056f2c04e90920.png';
    return (
        <header className={style.header}>
            <div className={style.userPhoto}>
                {props.isLoggedIn ? <img src={url}/> : null}
            </div>
            {
                props.loginName !== null
                    ? <button onClick={()=> props.logout()}> {props.loginName} </button>
                    : <button>Login</button>
            }
        </header>
    )
}