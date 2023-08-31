"use client";

import useBoardsActions from "@/hooks/useBoardsActions";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { useState } from "react";
import FormAdderBoard from "./FormAdder";
import QuestionBtn from "./QuestionBtn";

interface IProps {
  title:string
  create: ActionCreatorWithPayload<string>
}

export default function Adder({title, create}: IProps) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const toggleForm = () => setIsOpenForm(!isOpenForm);
  return (
    <>
      {isOpenForm ? (
        <FormAdderBoard create={create} isOpenForm={isOpenForm} toggleForm={toggleForm} />
      ) : (
        <QuestionBtn title={title} toggleForm={toggleForm} />
      )}
    </>
  );
}

