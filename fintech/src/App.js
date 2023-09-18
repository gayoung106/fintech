import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ListComponent from "./components/ListComponent";
// import HeaderComponent from "./components/HeaderComponent";
// import EventComponent from "./components/EventComponent";
// import AxiosComponent from "./components/AxiosComponent";
// import NewsSearch from "./pages/NewsSearch";
import MainPage from "./pages/MainPage";
import AuthResult from "./pages/AuthResult";
import AccountList from "./pages/AccountList";
import Balance from "./pages/Balance";
import QrCode from "./pages/QrCode";
import QrReader from "./pages/QrReader";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<ListComponent></ListComponent>}></Route>
        <Route
          path="/header"
          element={<HeaderComponent></HeaderComponent>}
        ></Route>
        <Route
          path="/event"
          element={<EventComponent></EventComponent>}
        ></Route>
        <Route
          path="/axios"
          element={<AxiosComponent></AxiosComponent>}
        ></Route>
        <Route path="/news" element={<NewsSearch></NewsSearch>}></Route> */}
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/authResult" element={<AuthResult />}></Route>
        <Route path="/list" element={<AccountList />}></Route>
        <Route path="/balance" element={<Balance />}></Route>
        <Route path="/qrcode" element={<QrCode />}></Route>
        <Route path="/qrreader" element={<QrReader />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
