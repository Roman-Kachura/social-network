import React from "react";
import {UserProfileType} from "../../store/profile-reducer";
import s from './Profile.module.css';

type ProfilePropsType = {
    profile: UserProfileType
    status:any
}

export const Profile = (
    {profile,status,...props}: ProfilePropsType
) => {
    if (profile) {
        return (
            <div className={s.profile}>
                <div className={s.profileImage}>
                    <img src={profile.photos.large || 'https://vjoy.cc/wp-content/uploads/2020/12/1133ea1de4e69bd760056f2c04e90920.png'}/>
                </div>
                <div>
                    <h3>{profile.fullName}</h3>
                    <div>{status}</div>
                    <div>{profile.aboutMe}</div>
                    <div>{profile.lookingForAJob ? profile.lookingForAJobDescription : null}</div>
                    <div>
                        <h4>Контакты:</h4>
                        <ul>
                            {profile.contacts.github ? <li>github: ${profile.contacts.github}</li> : null}
                            {profile.contacts.vk ? <li>vk: ${profile.contacts.vk}</li> : null}
                            {profile.contacts.facebook ? <li>facebook: ${profile.contacts.facebook}</li> : null}
                            {profile.contacts.instagram ? <li>instagram: ${profile.contacts.instagram}</li> : null}
                            {profile.contacts.twitter ? <li>twitter: ${profile.contacts.twitter}</li> : null}
                            {profile.contacts.website ? <li>website: ${profile.contacts.website}</li> : null}
                            {profile.contacts.youtube ? <li>youtube: ${profile.contacts.youtube}</li> : null}
                            {profile.contacts.mainLink ? <li>mainLink: ${profile.contacts.mainLink}</li> : null}
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h3>{undefined}</h3>
            </div>
        )
    }

}