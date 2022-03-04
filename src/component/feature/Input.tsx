import React, {ChangeEvent} from "react";

type InputPropsType = {
    onChangeTitleCallBack: (newTitle: string) => void
    title: string
    addPost: () => void
    error:string[] | []
    className?:string
    setError:(newError:string | [] | string[]) => void
}

export const Input = (props: InputPropsType) => {
    let finishClassName = props.error.some(e => e === 'Title error!') ? props.className + ' error' : props.className;

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeTitleCallBack(e.currentTarget.value);
        props.setError(props.error.filter(e => e !== 'Title error!'));
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.addPost();
        }
    }

    return (
        <div className={finishClassName}>
            <input
                onKeyPress={onKeyPress}
                onChange={onChangeTitle}
                value={props.title}
                placeholder={'Заголовок поста...'}
                type={'text'}
            />
            <span>{props.error.some(e => e === 'Title error!') ? 'Поле заголовка не может быть пустым' : ''}</span>
        </div>
    )
}