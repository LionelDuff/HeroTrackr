import { Spin } from "antd";

export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <Spin tip="Loading..." size="large" fullscreen />
    </div>
  );
}
