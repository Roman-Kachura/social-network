import React from "react";
import ProfileContainer from "./ProfileContainer";

type MyProfileProps = {
    id:number
}

export const MyProfile = ({id}:MyProfileProps) => {
    return (
        <div>
            <ProfileContainer userID={id}/>
        </div>
    )
}