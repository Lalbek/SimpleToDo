import { Button, Form, Input, Layout, List, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "../../types";
import { contentStyle } from "../../Styles";
import { ListItem } from "../ListItem/ListItem";

export default function TodoList() {
  const [valueOfInput, setValueOfInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTemporaryTask, setEditTemporaryTask] = useState<Task | null>(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    handleGetTask();
  }, []);

  const resetStates = () => {
    setEditTemporaryTask(null);
    setValueOfInput("");
    handleGetTask();
  };

  async function handleGetTask() {
    try {
      const res = await axios.get<Task[]>(`${apiUrl}`);
      setTasks(res.data);
    } catch (error) {
      message.error("Error");
    }
  }

  async function handleAddTask() {
    if (valueOfInput.trim() === "") {
      message.error("Please add a task");
      return;
    }
    try {
      const res = await axios.post<Task>(`${apiUrl}`, {
        title: valueOfInput,
        completed: false,
      });
      resetStates();
      message.success("Task successfully added");
    } catch (error) {
      message.error("Error adding task");
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      await axios.delete<Task>(`${apiUrl}/${id}`);
      resetStates();
    } catch (error) {
      message.error("Error deleting");
    }
  }

  async function handleToggle(item: Task) {
    try {
      setEditTemporaryTask(null);
      await axios.put(`${apiUrl}/${item.id}`, {
        completed: !item.completed,
        title: item.title,
        id: item.id,
      });
      handleGetTask();
    } catch (error) {
      message.error("Error with toggle");
    }
  }

  const handleEdit = async () => {
    try {
      await axios.put(`${apiUrl}/${editTemporaryTask?.id}`, {
        title: valueOfInput,
        completed: editTemporaryTask?.completed,
      });

      resetStates();
      message.success("Task successfully updated");
    } catch (error) {
      message.error("Error updating task");
    }
  };

  async function handlSubmit() {
    if (editTemporaryTask !== null) {
      handleEdit();
    } else {
      handleAddTask();
    }
  }

  function handleEditTemporaryTask(item: Task) {
    if (editTemporaryTask === null) {
      setEditTemporaryTask(item);
      setValueOfInput(item.title);
    }
  }

  return (
    <Layout.Content style={contentStyle}>
      <Form>
        <Input
          value={valueOfInput}
          onChange={(e) => setValueOfInput(e.target.value)}
          style={{ width: 300, marginBottom: 20 }}
          placeholder="Write the task!!!"
        />

        <Button type="primary" onClick={handlSubmit}>
          {editTemporaryTask !== null ? "Save" : "Submit"}
        </Button>

        <List
          size="small"
          style={{ marginTop: 30, width: 400 }}
          bordered
          dataSource={tasks}
          renderItem={(item) => (
            <ListItem
              item={item}
              handleDeleteTask={handleDeleteTask}
              handleToggle={handleToggle}
              handleEditTemporaryTask={handleEditTemporaryTask}
            />
          )}
        />
      </Form>
    </Layout.Content>
  );
}
