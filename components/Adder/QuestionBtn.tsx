

import React from "react";

export default function QuestionBtn({ toggleForm, title }: { toggleForm: () => void, title:string }) {
    return (
      <button className="h-min bg-ned-el-bg p-7 rounded-xl mb-5 mx-5 flex justify-center items-center bg-opacity-10 hover:bg-opacity-100 transition-all duration-500" onClick={toggleForm}>
          {title}
      </button>
    );
  }