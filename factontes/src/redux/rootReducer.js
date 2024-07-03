import { combineReducers } from "@reduxjs/toolkit";
import { TrainingProject } from "./reducer"

export default combineReducers(
    {
        TrainingProject : TrainingProject,
    }
)