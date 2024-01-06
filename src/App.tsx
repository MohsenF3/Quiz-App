import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Questions from "./components/Questions";
import Score from "./components/Score";
import Setting from "./components/Setting";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="bg-[#9fd3fd] overflow-hidden p-5 w-[350px] h-[600px] mx-auto rounded-3xl shadow-md ">
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Welcome />} />
            <Route path="/setting" index element={<Setting />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/score" element={<Score />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
