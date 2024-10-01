import { Layout } from "antd";
import React from "react";
const headerStyle: React.CSSProperties = {
  textAlign: "left",
  color: "#fff",
  height: 70,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};
export default function HeaderLay() {
  return (
    <Layout.Header style={headerStyle}>
      <h1>React TodoList</h1>
    </Layout.Header>
  );
}
