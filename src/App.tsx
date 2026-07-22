import { DialogDemo } from "./components/dialogCom";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ToDoList } from "./components/todolist";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./components/ui/card";

type Todo = {
  task: string;
  completed: boolean;
};

type ToDoListType = {
  [date: string]: Todo[];
};

type User = {
  username: string;
  password: string;
  todos: ToDoListType;
};

const createList = (): ToDoListType => {
  const currentUser = localStorage.getItem("currentUser");

  const users: User[] = JSON.parse(
    localStorage.getItem("users") ?? "[]"
  );

  const user = users.find(
    (u) => u.username === currentUser
  );

  return user?.todos ?? {};
};

export const App = () => {
  const [todolist, setTodolist] = useState<ToDoListType>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setTodolist(createList());
  }, []);

  const AddTask = (task: string, date: Date) => {
    const key = date.toLocaleDateString();

    const duplicate = (todolist[key] ?? []).some(
      (t) =>
        t.task.trim().toLowerCase() ===
        task.trim().toLowerCase()
    );

    if (duplicate) {
      return false;
    }

    setTodolist((prev) => {
      const updatedList = {
        ...prev,
        [key]: [
          ...(prev[key] ?? []),
          {
            task,
            completed: false,
          },
        ],
      };

      const currentUser = localStorage.getItem("currentUser");

      const users: User[] = JSON.parse(
        localStorage.getItem("users") ?? "[]"
      );

      const user = users.find(
        (u) => u.username === currentUser
      );

      if (user) {
        user.todos = updatedList;

        localStorage.setItem(
          "users",
          JSON.stringify(users)
        );
      }

      return updatedList;
    });

    return true;
  };

  const HandleToggle = (index: number) => {
    const key = selectedDate.toLocaleDateString();

    setTodolist((prev) => {
      const updatedList = {
        ...prev,
        [key]: (prev[key] ?? []).map((todo, i) =>
          i === index
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo
        ),
      };

      const currentUser = localStorage.getItem("currentUser");

      const users: User[] = JSON.parse(
        localStorage.getItem("users") ?? "[]"
      );

      const user = users.find(
        (u) => u.username === currentUser
      );

      if (user) {
        user.todos = updatedList;

        localStorage.setItem(
          "users",
          JSON.stringify(users)
        );
      }

      return updatedList;
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 h-full">
      <Card className="max-md:hidden"/>

      <Card className="md:col-span-4 flex h-full flex-col">
        <div className="flex-1 px-4">
          <CardTitle className="mx-auto border-b-2 border-b-gray-500 p-2 text-xl font-extrabold text-green-300">
            TODO LIST
          </CardTitle>

          <CardDescription>
            Press <strong>Create Task</strong> to create a new task.
          </CardDescription>

          <CardContent>
            <div className="flex justify-start p-5">
              <ToDoList
                handletoggle={HandleToggle}
                TList={
                  todolist[selectedDate.toLocaleDateString()] ??
                  []
                }
              />
            </div>
          </CardContent>
        </div>

        <CardFooter>
          <DialogDemo
            addtask={AddTask}
            todolist={todolist}
          />
        </CardFooter>
      </Card>

      <Card>
        <CardContent>
          <CardTitle className="m-auto mb-5 text-center text-green-300">
            Pick a date
          </CardTitle>

          <hr />

          <Calendar
            className="mt-4 rounded-md border-2 border-green-100"
            mode="single"
            selected={selectedDate}
            onSelect={(day) => {
              if (day) {
                setSelectedDate(day);
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};