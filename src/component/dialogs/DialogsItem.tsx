import {DialogType, getMessagesTC} from "../../store/dialogs-reducer";
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import React from "react";
import {useDispatch} from "react-redux";
import {correctDate} from "../../store/reselect/howNumberOfPagesReselect";

export const DialogsItem = (props: DialogsItemPropsType) => {
    const fullDate = correctDate(props.lastUserActivityDate)
    const dispatch = useDispatch();
    const onClickHandler = async ()  => {
        await dispatch(getMessagesTC(props.id,20,1));
    }
    return (
        <div className={`block ${s.dialogsItem}`}>
            <div className={s.image}>
                <NavLink
                    title={props.userName}
                    to={`/dialogs/${props.id}/messages`}
                    onClick={onClickHandler}
                >
                    <img
                        alt={props.userName}
                        src={props.photos.small || 'https://vjoy.cc/wp-content/uploads/2020/12/1133ea1de4e69bd760056f2c04e90920.png'}/>
                </NavLink>

            </div>
            <div className={s.description}>
                <NavLink
                    className={s.userName}
                    title={props.userName}
                    to={`/dialogs/messages/${props.userName}`}
                    onClick={onClickHandler}
                >
                    {props.userName}
                </NavLink>
                <div>
                    <small>
                        <em>{fullDate.date} {fullDate.time}</em>
                    </small>
                </div>
            </div>
            <div className={s.hasNewMessages}>
                {props.hasNewMessages ? 'You have a new message!' : ''}
            </div>
        </div>
    )
}

//Types

type DialogsItemPropsType = DialogType