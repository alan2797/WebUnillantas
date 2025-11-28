import React, { useEffect } from "react";
import AppRoutes from "./routes/app.route";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store";
import type { TokenPayload } from "./interfaces/login.interface";
import { jwtDecode } from "jwt-decode";
import { env } from "./config/env";
import { getPermissionsUser } from "./redux/features/auth.slice";
import { handleRequestThunk } from "./utils/handle-request-thunk";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";
import moment from "moment";
// @ts-ignore
import "moment/locale/es";
moment.locale("es"); 
const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  console.log(token);
  let isAuthenticated = !!token;
 
  if (token) {
    /*try {
      const decoded = jwtDecode<TokenPayload>(token);
      if(decoded.isAdmin){
        isAuthenticated = true;
      }else{
        isAuthenticated = !!decoded.branchId && !!decoded.areaId && !!decoded.positionId;
      }
    } catch (err) {
      isAuthenticated = false;
    }*/
    isAuthenticated = true;
  }

  useEffect(() => {
    if (isAuthenticated && token) {
      console.log("entro a apptsx")
      //handleRequestThunk(dispatch, () => dispatch(getPermissionsUser()).unwrap());
      //dispatch(getPermissionsUser());
    }
  }, [isAuthenticated, token, dispatch]); 

  return (
    <Router basename={env.baseHref}>  
      <ConfigProvider locale={esES}>
        {/* <AppRoutes isAuthenticated={isAuthenticated} /> */}
        <AppRoutes isAuthenticated={true} />
      </ConfigProvider>
    </Router>
  );
};

export default App;
