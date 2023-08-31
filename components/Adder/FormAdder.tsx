import React from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

interface IProps {
    create: ActionCreatorWithPayload<string>
    toggleForm: () => void
    isOpenForm: boolean
  }
  
  export default function FormAdderBoard({ toggleForm, isOpenForm,  create}: IProps) {
    const [inputValue, setInputValue] = useState("");
  
    useEffect(() => {
      if (isOpenForm) {
          document.querySelector('input')?.focus()
      }
    }, [isOpenForm])
  
    const createNewBoard:React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()
      create(inputValue)
      setInputValue('')
      toggleForm()
    }
  
    const styleBtn = "bg-white text-ned-main-bg p-2 text-center rounded-xl w-1/2";
    return (
      <form
      onSubmit={createNewBoard}
        className="bg-ned-el-bg h-min p-7 rounded-xl mb-5 mx-5 flex justify-center flex-col items-center"
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="outline-none p-5 rounded-xl text-ned-main-bg placeholder:text-ned-el-bg"
          type="text"
          placeholder="Введите название"
        />
        <div className="flex justify-around w-full mt-5">
          <button onClick={toggleForm} type="reset" className={`${styleBtn} mr-5`}>
            Отмена
          </button>
          <button type="submit" className={styleBtn}>
            Создать
          </button>
        </div>
      </form>
    );
  }