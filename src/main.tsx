import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import Spinner from "./components/spinner/spinner.component.tsx";
import "./index.css";
import { ThemeVariables } from "./utils/theme-provider.ts";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FB3748", // tu color primary personalizado,
            colorTextSecondary: "#151515",
            borderRadius: 6, // bordes redondeados (opcional)
          },
        }}
      >
        <ThemeVariables />
        <App />
        <Spinner />
      </ConfigProvider>
    </Provider>
);
