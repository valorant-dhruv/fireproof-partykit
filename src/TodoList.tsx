import React from "react";
import { TodoItem } from "./TodoItem";
import { useFireproof } from "use-fireproof";
import { fireproof } from "@fireproof/core";


export function TodoList(props: { view: "all" | "active" | "completed", partykit:any}) {
  // const store = useSyncedStore(globalStore);
  const { useLiveQuery } = useFireproof(fireproof("fireproof-partykit-main"));
  const store = useLiveQuery("startedAt").docs;
  // console.log(store);
  const activeTodos = store.filter((t) => !t.completed);
  const completedTodos = store.filter((t) => t.completed);
  const shownTodos =
    props.view === "all"
      ? store
      : props.view === "active"
      ? activeTodos
      : completedTodos;

  return (
    <ul className="todo-list">
      {/* These are here just to show the structure of the list items 
        // List items should get the class `editing` when editing and `completed` when marked as completed  */}
      {shownTodos.map((todo, i) => (
        <TodoItem todo={todo} key={i} partysocket={props.partykit} />
      ))}

    </ul>
  );
}