'use client'
import React from "react";
import { useRouter } from "next/navigation";
import useBoardsActions from "@/hooks/useBoardsActions";

export default function Board({ title, id }: { title: string, id: string }) {
const router = useRouter()
  const {openBoard, deleteBoard} = useBoardsActions()
    
const openedBoardhandler = () => {
    openBoard(id)
    router.push(`board/${id}`)
}
const removeBoardhandler:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    deleteBoard(id)
}
  return (
    <div onClick={openedBoardhandler} className="cursor-pointer h-min bg-ned-el-bg p-7 rounded-xl mb-5 mx-5 flex flex-col justify-center items-center transition-transform hover:scale-105">
        {title}
        <button onClick={removeBoardhandler} className="mt-5 font-light text-black hover:font-bold">Удалить</button>
    </div>
  );
}
