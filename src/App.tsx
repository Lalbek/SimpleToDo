import { Layout } from "antd";

import HeaderLay from "./components/Header/HeaderLay";
import TodoList from "./components/TodoList/TodoList";

function App() {
  return (
    <Layout>
      <HeaderLay />
      <TodoList />
    </Layout>
  );
}

export default App;
