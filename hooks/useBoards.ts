import { useTypedSelector } from "./useTypedSelector";



export const useBoards = () => useTypedSelector(state => state.boards)
