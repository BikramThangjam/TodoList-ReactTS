import { Todo } from "../model";
import { Actions } from "./actions";

export const todoReducer = (state: Todo[], action: Actions) => {
    switch (action.type){
        case "add":
            return [
                {
                    id: Date.now(),
                    todo: action.payload,
                    isDone: false
                },
                ...state
            ];
        case "edit":
            return state.map((todo)=> todo.id === action.payload.id ? {...todo, todo:action.payload.text} : todo)
        case "remove":
            return state.filter((todo) => todo.id !== action.payload);
        case "done":
            return state.map((todo) => todo.id === action.payload ? {...todo, isDone: !todo.isDone}: todo);
        default:
            return state;
    }
}