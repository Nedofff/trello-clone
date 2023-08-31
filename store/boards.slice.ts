import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

interface IState {
  openedBoard: {
    isExist: "404" | "first" | "true";
    board?: IBoard;
  };
  boards: IBoard[];
}
interface ICreateTask {
  title: string;
  listId: string;
}
interface IToggleTaskReadiness {
  taskId: string;
  listId: string;
  isDone: boolean;
}

const initialState: IState = {
  openedBoard: {
    isExist: "first",
    board: undefined,
  },
  boards: [],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<string>) => {
      const board: IBoard = {
        title: action.payload,
        id: nanoid(),
        lists: [],
      };
      state.boards.push(board);
    },
    openBoard: (state, action: PayloadAction<string>) => {
      const openedBoard = state.boards.find(
        (board) => board.id === action.payload
      );
      if (openedBoard) {
        state.openedBoard.isExist = "true";
        state.openedBoard.board = openedBoard;
      } else {
        state.openedBoard.isExist = "404";
      }
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      const newBoards = [...state.boards].filter(
        (board) => board.id !== action.payload
      );
      state.boards = newBoards;
    },
    createList: (state, action: PayloadAction<string>) => {
      const list: IList = {
        id: nanoid(),
        title: action.payload,
        tasks: [],
      };
      state.openedBoard.board?.lists.push(list);
      state.boards
        .find((board) => board.id === state.openedBoard.board?.id)
        ?.lists.push(list);
    },
    deleteList: (state, action: PayloadAction<string>) => {
      const newLists = [...state.openedBoard.board?.lists!].filter(
        (list) => list.id !== action.payload
      );
      state.openedBoard.board!.lists = newLists;
      state.boards.find(
        (board) => board.id === state.openedBoard.board?.id
      )!.lists = newLists;
    },
    createTask: (state, action: PayloadAction<ICreateTask>) => {
      const task: ITask = {
        id: nanoid(),
        title: action.payload.title,
        isDone: false,
      };
      state.openedBoard.board?.lists
        .find((list) => list.id === action.payload.listId)
        ?.tasks.push(task);
      state.boards
        .find((board) => board.id === state.openedBoard.board?.id)
        ?.lists.find((list) => list.id === action.payload.listId)
        ?.tasks.push(task);
    },
    toggleTaskReadiness: (
      state,
      action: PayloadAction<IToggleTaskReadiness>
    ) => {
      state.boards
        .find((board) => board.id === state.openedBoard.board!.id)!
        .lists.find((list) => list.id === action.payload.listId)!
        .tasks.find((task) => task.id === action.payload.taskId)!.isDone =
        !action.payload.isDone;
    },
  },
});
