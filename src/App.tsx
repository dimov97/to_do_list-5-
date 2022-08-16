import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type toDoListType = {
    id: string
    title:string
    filter: FilterValuesType
}

function App() {

    function removeTask(id: string, toDoListId:string) {
        let tasks = tasksObj[toDoListId]
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[toDoListId] = filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, toDoListId:string ) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[toDoListId]
        let newTasks = [task, ...tasks];
        tasksObj[toDoListId] = newTasks
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean,toDoListId:string) {
        let tasks = tasksObj[toDoListId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }




    function changeFilter(value: FilterValuesType, toDoListId:string) {
        let toDoList = toDoLists.find(tl=> tl.id === toDoListId)
        if (toDoList)
            toDoList.filter = value
        setToDoLists([...toDoLists])
    }

    let toDoList1 = v1()
    let toDoList2 = v1()


    let [toDoLists, setToDoLists] = useState<Array<toDoListType>>([
        {id:toDoList1, title:'what to learn ?', filter:'active'},
        {id:toDoList2, title:'what to buy ?', filter:'completed'}
    ])

    let removeToDoList = (toDoListId: string) => {
        let filteredToDoLists = toDoLists.filter(t=> t.id !== toDoListId)
        setToDoLists(filteredToDoLists)
        delete tasksObj[toDoListId]
        setTasks({...tasksObj})

    }

    let [tasksObj, setTasks]=useState({
        [toDoList1]:[{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [toDoList2]:[{id: v1(), title: "book", isDone: true},
            {id: v1(), title: "milk", isDone: false},]

    })

    return (
        <div className="App">
            {toDoLists.map((tl)=>{
                let tasksForTodolist = tasksObj[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }
                return(
                    <Todolist title={tl.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={tl.filter}
                              id={tl.id}
                              key={tl.id}
                              removeToDoList={removeToDoList}
                    />
                )
            })}
        </div>
    );
}

export default App;
