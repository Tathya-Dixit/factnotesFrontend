import { ADD_ON_STATE, SUB_ON_STATE } from "./constant"

export const initialData = {
    state:0,
};

export const TrainingProject = (data=initialData,action) => {
    switch (action.type){
        case ADD_ON_STATE:
            return {state : data.state+1}
        case SUB_ON_STATE:
            return {state : data.state-1}
        default:
            return data;
    }

};