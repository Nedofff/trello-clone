'use client'

import Adder from "@/components/Adder/Adder";
import Board from "@/components/Board/Board";
import { useBoards } from "@/hooks/useBoards";
import useBoardsActions from "@/hooks/useBoardsActions";


export default function HomePage() {
  const {createBoard} = useBoardsActions()
  
  const boards = useBoards()
  return (
    <main className="p-10 flex flex-wrap h-screen content-start">
      {boards.boards.map(board => <Board title={board.title} id={board.id} key={board.id}/>)}
      <Adder title='Создать новую доску' create={createBoard}/>
    </main>
  )
}
