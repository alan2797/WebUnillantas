
import { useSelector } from "react-redux";
import { Spin } from "antd";
import type { RootState } from "../../redux/store";
import { LoadingOutlined } from "@ant-design/icons";

const Spinner = () => {
  const loading = useSelector((state: RootState) => state.spinner.loading);

  if (!loading) return null;
  const antIcon = <LoadingOutlined color="primary" style={{ fontSize: 80 }} spin />;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Spin tip="Cargando..." indicator={antIcon} />
    </div>
  );
};

export default Spinner;
