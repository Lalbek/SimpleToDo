import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Layout, List, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Task } from "../../types";
import { contentStyle } from "../../Styles";

export default function TodoList() {
  const [valueOfInput, setValueOfInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [edit, setEdit] = useState<Task | null>(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    handleGetTask();
  }, []);

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
      setTasks([...tasks, res.data]);
      setValueOfInput("");
      message.success("Task successfully added");
    } catch (error) {
      message.error("Error adding task");
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      await axios.delete<Task>(`${apiUrl}/${id}`);
      handleGetTask();
      setValueOfInput("");
      setEdit(null);
    } catch (error) {
      message.error("Error deleting");
    }
  }

  async function handleToggle(item: Task) {
    try {
      setEdit(null);
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

  async function handleEditSubmit() {
    if (edit !== null) {
      try {
        await axios.put(`${apiUrl}/${edit.id}`, {
          title: valueOfInput,
          completed: edit.completed,
        });
        setEdit(null);
        setValueOfInput("");
        handleGetTask();
        message.success("Task successfully updated");
      } catch (error) {
        message.error("Error updating task");
      }
    } else {
      handleAddTask();
    }
  }

  function handleEdit(item: Task) {
    if (edit === null) {
      setEdit(item);
      setValueOfInput(item.title);
    }
  }

  return (
    <Layout.Content style={contentStyle}>
      <Form>
        <Input
          value={valueOfInput}
          onChange={(e) => setValueOfInput(e.target.value)}
          style={{ width: 400, margin: 10, marginTop: 20 }}
          placeholder="Write the task!!!"
        />

        <Button
          type="primary"
          onClick={edit !== null ? handleEditSubmit : handleAddTask}
        >
          {edit !== null ? "Save" : "Submit"}
        </Button>

        <List
          size="small"
          style={{ marginTop: 30, width: 400, marginLeft: 500 }}
          bordered
          dataSource={tasks}
          renderItem={(item) => (
            <List.Item
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              <Checkbox
                onClick={() => handleToggle(item)}
                checked={item.completed}
              />

              {item.title}

              <div>
                <Button
                  type="link"
                  danger
                  onClick={() => handleEdit(item)}
                  disabled={item.completed}
                >
                  <EditTwoTone />
                </Button>

                <Button
                  type="link"
                  danger
                  onClick={() => handleDeleteTask(item.id)}
                >
                  <DeleteTwoTone />
                </Button>
              </div>
            </List.Item>
          )}
        />
      </Form>
    </Layout.Content>
  );
}
