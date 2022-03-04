import React from "react";
import style from './Menu.module.css';
import {NavLink} from "react-router-dom";

type MenuPropsCount = {
    newMessagesCount:number
}

export const Menu = ({newMessagesCount,...props}:MenuPropsCount) => {
    return(
        <div className={style.menu + ' block'}>
            <h3 className={style.title}>Menu</h3>
            <nav className={style.navigation}>
                <NavLink className={style.navLink} to={'/profile/me'}>Home</NavLink>
                <NavLink className={style.navLink} to={'/posts'}>Post</NavLink>
                <NavLink className={style.navLink} to={'/users'}>Users</NavLink>
                <NavLink className={style.navLink} to={'/follow'}>Follow</NavLink>
                <NavLink className={style.navLink} to={'/dialogs'}>
                    Dialogs
                    {newMessagesCount ? <small>{newMessagesCount}</small> : null}
                </NavLink>
            </nav>
        </div>
    )
}