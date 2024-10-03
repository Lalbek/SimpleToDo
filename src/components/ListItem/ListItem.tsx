import { Button, Checkbox, List } from "antd";
import { Task } from "../../types";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

interface IPropsListItem {
  item: Task;
  handleToggle: (item: Task) => void;
  handleEditTemporaryTask: (item: Task) => void;
  handleDeleteTask: (id: number) => void;
}

export function ListItem({
  item,
  handleToggle,
  handleEditTemporaryTask,
  handleDeleteTask,
}: IPropsListItem) {
  return (
    <List.Item
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textDecoration: item.completed ? "line-through" : "none",
      }}
    >
      <Checkbox onClick={() => handleToggle(item)} checked={item.completed} />

      {item.title}

      <div>
        <Button
          type="link"
          danger
          onClick={() => handleEditTemporaryTask(item)}
          disabled={item.completed}
        >
          <EditTwoTone />
        </Button>

        <Button type="link" danger onClick={() => handleDeleteTask(item.id)}>
          <DeleteTwoTone />
        </Button>
      </div>
    </List.Item>
  );
}
