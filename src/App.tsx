import { Layout } from "antd";

import ContentLay from "./components/Layout/ContentLay";
import HeaderLay from "./components/Layout/HeaderLay";

function App() {
  return (
    <Layout>
      <HeaderLay />
      <ContentLay />
    </Layout>
  );
}

export default App;
