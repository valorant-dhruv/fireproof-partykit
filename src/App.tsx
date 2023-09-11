import React, { useState,useEffect, useRef } from "react";
import { TodoList } from "./TodoList";
import { fireproof } from "@fireproof/core";
import { useFireproof } from "use-fireproof";
import PartySocket from "partysocket";
// import { useQueueState } from "rooks";

function App() {
  const { useLiveQuery, useDocument } = useFireproof(
    fireproof("fireproof-partykit-main")
  );
  const store = useLiveQuery("startedAt").docs;
  // console.log("This is the store", store);
  // console.log("This is the length of the store", store.length);

  let partysocket=useRef<PartySocket | undefined>(undefined);

  // const numberToPushRef = useRef(0);
  // const [list, { enqueue, 
  //     length }] = useQueueState([]);

  const [customqueue,setcustomqueue]=useState(['nothing'])

  // const [refreshKey, setRefreshKey] = useState(0);

  // function addToQueue(argument:string) 
  // {
  //       // numberToPushRef.current = 
  //       //     numberToPushRef.current + 1;
          
  //       // enqueue();
  //       setcustomqueue(olddata=>{
  //         return [...olddata,argument]
  //       }) 
  // }

  //Establishing the connection with the partykit server using useEffect hook
  useEffect(()=>{
      partysocket.current= new PartySocket({
        host: "localhost:1999",
        room: "my-room",
      });
    
  },[])

  const [todo, settodo, savetodo] = useDocument({
    title:'',
    completed: false,
    startedAt: Date.now()
  });

  // const [value, setvalue] = useState("");
  const [view, setView] = useState<"all" | "active" | "completed">("all");
  

  const activeTodos = store.filter((t) => !t.completed);
  const hasCompletedTodos = !!store.find((t) => t.completed);

  if(partysocket.current)
  {
    partysocket.current.addEventListener("message", (e) => {

      //Here we receive the data from another user
      console.log(e.data);

      //Trigger a refresh here
      // setRefreshKey(refreshKey + 1);
      if(e.data)
      {
        console.log(e.data,"What is this?")
        window.location.reload()
      }

      //Now we add this data to the queue
      // addToQueue(e.data)
    });

  }
 

  return (
    <div className="todoRoot">
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            onChange={(e) => {
              settodo({ title: e.target.value });
            }}
            placeholder="What needs to be done?"
            autoFocus
          />
          <button
            onClick={(e) => {
              if(partysocket.current && todo.title)
              {
                partysocket.current.send(todo.title.toString())
              }
              console.log("The value of todo is",todo)
              e.preventDefault();
              savetodo();
            }}
          >
            Save
          </button>
        </header>
        {/* This section should be hidden by default and shown when there are todos */}
        {!!store.length && (
          <>
            <section className="main">
              <TodoList view={view} partykit={partysocket.current}></TodoList>
            </section>
            {/* This footer should be hidden by default and shown when there are todos  */}
            <footer className="footer">
              {/* This should be `0 items left` by default  */}
              <span className="todo-count">
                <strong>{activeTodos.length}</strong>{" "}
                {activeTodos.length === 1 ? "item" : "items"} left
              </span>
              {/* Remove this if you don't implement routing  */}
              <ul className="filters">
                <li>
                  <button
                    className={view === "all" ? "selected" : ""}
                    onClick={(e) => {
                      setView("all");
                      e.preventDefault();
                    }}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    className={view === "active" ? "selected" : ""}
                    onClick={(e) => {
                      setView("active");
                      e.preventDefault();
                    }}
                  >
                    Active
                  </button>
                </li>
                <li>
                  <button
                    className={view === "completed" ? "selected" : ""}
                    onClick={(e) => {
                      setView("completed");
                      e.preventDefault();
                    }}
                  >
                    Completed
                  </button>
                </li>
              </ul>
            </footer>
          </>
        )}
      </section>
    </div>
  );
}

export default App;