"use client";

import React, { useLayoutEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { useBoards } from "@/hooks/useBoards";
import useBoardsActions from "@/hooks/useBoardsActions";
import List from "@/components/List/List";
import Adder from "@/components/Adder/Adder";

export default function BoardPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const { openBoard } = useBoardsActions();
  const openedBoard = useBoards().openedBoard;
  useLayoutEffect(() => {
    openBoard(id);
    if (openedBoard.isExist === '404') {
      notFound();
    }
  }, [id,openedBoard.isExist, openBoard]);

  const {createList} = useBoardsActions()

  if (openedBoard && openedBoard.isExist === 'true') {
    return (
      <main className="p-10 h-screen">
        <div className="mb-10 flex items-center pl-10">
          <h2 className="text-3xl mr-10">{openedBoard.board!.title}</h2>
          <button
            onClick={() => router.push("/")}
            className="text-2xl bg-ned-el-bg rounded-xl py-3 px-8 bg-opacity-10 hover:bg-opacity-100 transition-all duration-500"
          >
            Назад
          </button>
        </div>
        <div className="p-5 flex flex-wrap content-start">
          {openedBoard.board!.lists.map((list) => (
            <List key={list.id} id={list.id} title={list.title} tasks={list.tasks} />
          ))}
          <Adder create={createList} title='Создать новый лист...'/>
        </div>
      </main>
    );
  }
}
