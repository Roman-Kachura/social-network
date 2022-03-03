import React, {ChangeEvent, useState} from "react";

type EditableItemType = {
    value: string
    editMode: boolean
    onChangeCallBack: (value: string) => void
}

export const EditableItem = ({value,onChangeCallBack,editMode,...props}: EditableItemType) => {
    let [error, setError] = useState(false);

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeCallBack(e.currentTarget.value);
        if(!e.currentTarget.value.trim()){
            setError(true);
        } else {
            setError(false);
        }
    }

    return (
        <>
            {editMode
                ? <div className={error ? 'error' : ''}>
                    <input
                        type='text'
                        value={value}
                        onChange={onChangeValue}
                    />
                </div>
                : <span>{value}</span>}
        </>
    )
}