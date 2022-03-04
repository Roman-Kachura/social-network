import React, {ChangeEvent} from "react";

type TextareaPropsType = {
    onChangeTextCallBack: (newText: string) => void
    text: string
    addPost: () => void
    error?: string[] | []
    className?: string
    setError?:(newError:string | string[] | []) => void
}

export const Textarea = (props: TextareaPropsType) => {
    let finishClassName = props.error && props.error.some(e => e === 'Text error!') ? props.className + ' error' : props.className;

    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChangeTextCallBack(e.currentTarget.value);
        props.error && props.setError && props.setError(props.error.filter(e => e !== 'Text error!'));
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.addPost();
        }
    }
    return (
        <div className={finishClassName}>
            <textarea
                onKeyPress={onKeyPress}
                onChange={onChangeText}
                value={props.text}
                placeholder={'Описание поста'}
            />
            <span>{props.error && props.error.some(e => e === 'Text error!') ? 'Поле текста не может быть пустым' : ''}</span>
        </div>
    )
}