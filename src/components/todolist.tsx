import { Checkbox } from "@/components/ui/checkbox";


type Todo = {
  task: string;
  completed: boolean;
};

type Props = {
  TList: Todo[];
  handletoggle: (index: number) => void;
};

export const ToDoList = ({ TList, handletoggle }: Props) => {
 
  return (
    <ul>
      {TList?.map((val, index) => (
        <li key={index} className={val.completed?"flex items-center gap-2 line-through text-green-200":"flex items-center gap-2"}>
          <Checkbox
            checked={val.completed}
            onCheckedChange={() => handletoggle(index)}
          />
          <span>{val.task}</span>
        </li>
      ))}
    </ul>
  );
};