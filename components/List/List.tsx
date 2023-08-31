'use client'


import React, { useState } from 'react'
import styles from './List.module.css'
import useBoardsActions from '@/hooks/useBoardsActions'

export default function List({id, title, tasks}:{id:string, title:string, tasks:ITask[]}) {
  const {deleteList, createTask} = useBoardsActions()
  const [inputValue, setInputValue] = useState('')

  const createTaskHandler:React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    createTask({
      title: inputValue,
      listId: id
    })
    setInputValue('')
  }

  return (
    <div className='bg-ned-el-bg p-5 w-min rounded-xl mb-5 mx-5'>
      <div className='mb-3 px-1 flex justify-between content-center'>
      <h3 className='font-medium whitespace-nowrap'>{title}</h3>
      <button onClick={() => deleteList(id)} className='text-2xl text-ned-main-bg hover:text-white transition-colors'>⮾</button>
      </div>
        <form onSubmit={createTaskHandler}>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder='Задача' className='outline-none rounded-sm px-2 py-1 text-ned-main-bg placeholder:text-ned-el-bg placeholder:text-opacity-70'/>
        </form>
        <div className='mt-5 flex flex-col'>
            {tasks.map(task => <Task listId={id} id={task.id} key={task.id} title={task.title} isDone={task.isDone}/>)}
        </div>
    </div>
  )
}



function Task({listId, id, title, isDone}:{listId:string, id:string, title:string, isDone:boolean}) {
  const [isDoneState, setIsDoneState] = useState(isDone)
  const {toggleTaskReadiness} = useBoardsActions()

  const changeHandler = () => {
    setIsDoneState(!isDoneState)
    toggleTaskReadiness({
      listId,
      taskId: id,
      isDone: isDoneState
    })
  }

  return (
    <label className={`${styles.checkbox}`}>
    <input onChange={changeHandler} checked={isDoneState} type="checkbox"/>
    <div className={styles.checkbox__checkmark}></div>
    <div className={`font-light  ${isDoneState && 'line-through'}`}>{title}</div>
  </label>
  )
}