import { Button, Checkbox, List } from "antd";
import { PropsListItem } from "../../types";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

export function ListItem({
  item,
  handleToggle,
  handleEditTemporaryTask,
  handleDeleteTask,
}: PropsListItem) {
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
