import { combineReducers } from "@reduxjs/toolkit"

import projectsReducer from "@/store/project/project-slice"

const rootReducer = combineReducers({
  project: projectsReducer,
})

export default rootReducer
