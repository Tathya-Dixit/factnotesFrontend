import {
    ADD_ON_STATE, 
    SUB_ON_STATE
} from "./constant"



export const AddState = () => {
    return {
        type : ADD_ON_STATE
    }
}


export const SubState = () => {
    return {
        type : SUB_ON_STATE
    }
}