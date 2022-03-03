import React from "react";
import {UserType} from "../../store/users-reducer";
import s from './Users.module.css';
import UsersItem from "./UsersItem";


type UsersPropType = {
    users: UserType[]
    totalCount: number
    currentPageNumber: number
    showUsersCount: number
    getUsers: (count: number, page: number) => void
    getUserProfile: (userID: number) => void
    getUserStatus: (userID: number) => void
    checkFollow: (userID: number) => void
}

export const Users = (
    {
        users, totalCount, currentPageNumber, showUsersCount, getUsers, getUserProfile, getUserStatus,
        checkFollow, ...props
    }: UsersPropType
) => {
    const numberOfPage = Math.ceil(totalCount / showUsersCount);
    const buttonsForUserPage: JSX.Element[] = [];

    const createsButtons = (start: number, end: number) => {
        for (let i = start; i <= end; i++) {
            const finalClassName = i === currentPageNumber ? `${s.showPageBtn} ${s.active}` : `${s.showPageBtn}`;
            buttonsForUserPage.push(
                <button
                    key={i + ' showPageNumber'}
                    className={finalClassName}
                    onClick={() => {
                        onClickHandler(i)
                    }}
                >
                    {i}
                </button>
            )
        }
    }

    if (currentPageNumber < 6) {
        createsButtons(1, 10);
    } else if (currentPageNumber > 5 && currentPageNumber < numberOfPage - 5) {
        createsButtons(currentPageNumber - 4, currentPageNumber + 5);
    } else if (currentPageNumber >= numberOfPage - 5) {
        createsButtons(numberOfPage - 9, numberOfPage);
    }

    const onClickHandler = (page: number) => {
        getUsers(showUsersCount, page);
    }
    return (
        <div>
            {users.map(user => {
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
            <div className={s.showPageBtnsBlock}>
                {buttonsForUserPage}
            </div>
        </div>

    )
}