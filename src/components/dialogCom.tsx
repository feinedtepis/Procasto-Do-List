import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

type todo = {
  task: string;
  completed: boolean;
};

type ToDoListType = {
  [date: string]: todo[];
};

type prop = {
  addtask: (task: string, date: Date) => boolean;
  todolist: ToDoListType;
};

export function DialogDemo({ addtask, todolist }: prop) {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [task, setTask] = useState<string>("Yoga");
  const [error, setError] = useState<string>("");

    const HandleClick = () => {
        const key = date.toLocaleDateString();

        const duplicate = (todolist[key] ?? []).some(
            todo =>
                todo.task.trim().toLowerCase() ===
                task.trim().toLowerCase()
        );

        if (duplicate) {
            setError("Task already exists.");
            return;
        }

        addtask(task, date);

        setTask("");
        setError("");
        setOpen(false);
    };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) {
          setError("");
          setTask("");
        }
      }}
    >
      <form>
        <DialogTrigger
          render={<Button variant="default">Open Dialog</Button>}
        />

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Add tasks to your todoLIST.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Add task</Label>

              <Input
                id="name-1"
                name="name"
                value={task}
                onChange={(e) => {
                  setTask(e.target.value);
                  setError("");
                }}
              />

              {error && (
                <p className="mt-1 text-sm text-red-500">
                  {error}
                </p>
              )}
            </Field>

            <Field>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(day) => {
                  if (day) {
                    setDate(day);
                  }
                }}
                captionLayout="dropdown"
                disabled={(day) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return today > day;
                }}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose
              render={<Button variant="outline">Cancel</Button>}
            />

            <Button type="button" onClick={HandleClick}>
              Add task
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}