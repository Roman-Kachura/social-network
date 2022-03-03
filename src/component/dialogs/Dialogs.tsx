import React from "react";
import {connect} from "react-redux";
import {DialogType, getDialogsTC, getNewMessagesTC} from "../../store/dialogs-reducer";
import {RootReducerType} from "../../store/store";
import {DialogsItem} from "./DialogsItem";

class Dialogs extends React.Component<DialogsPropsType>{
    componentWillMount() {
        this.props.getDialogs();
        this.props.getNewMessages();
    }

    render() {
        return(
            <div>
                {
                    this.props.dialogs.map(d => <DialogsItem key={d.id} {...d}/>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state:RootReducerType):MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs
    }
}

const mapDispatchToProps:MapDispatchToPropsType = {
    getDialogs:getDialogsTC,
    getNewMessages:getNewMessagesTC
}

export default connect<MapStateToPropsType,MapDispatchToPropsType,{},RootReducerType>
(mapStateToProps,mapDispatchToProps)(Dialogs);

//Types

type MapStateToPropsType = {
    dialogs:DialogType[]
}

type MapDispatchToPropsType = {
    getDialogs:() => void
    getNewMessages:() => void
}

type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType;

