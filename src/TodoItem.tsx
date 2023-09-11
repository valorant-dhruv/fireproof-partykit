import { useSyncedStores } from "@syncedstore/react";
import { useState } from "react";
// import { globalStore, Todo } from "./store";
import { Todo } from "./store";
import { fireproof } from '@fireproof/core'
import { useFireproof } from "use-fireproof";

export function TodoItem(props: { todo: any, partysocket:any}) {
  const {database}=useFireproof(fireproof('fireproof-partykit-main'))
  // console.log(props.todo);

  return (
    <li className={props.todo.completed ? "completed" : "view"}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={props.todo.completed}
          onChange={() => {
            database.put({ ...props.todo, completed: !props.todo.completed })
            props.partysocket.send('It is being changed')

          }
            }
             
        />
        <label>
          {props.todo.title}
        </label>
      </div>
     
    </li>
  );
}
