import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Loading from "./components/Loading";

const Welcome = lazy(() => import("./components/Welcome"));
const Setting = lazy(() => import("./components/Setting"));
const Questions = lazy(() => import("./components/Questions"));
const Score = lazy(() => import("./components/Score"));

function App() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="bg-[#9fd3fd] overflow-hidden p-5 w-[350px] h-[600px] mx-auto rounded-3xl shadow-md ">
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" index element={<Welcome />} />
              <Route path="/setting" index element={<Setting />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/score" element={<Score />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
