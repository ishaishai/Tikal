import "./styles/app.css"
import "./styles/mobile.css"
import Task1 from "./components/Task1";
import Task2 from "./components/Task2";
import Loader from "./components/Loader"
import { useEffect, useMemo, useState } from "react";
import { getAppData } from "./utils/apiHandler";

function App() {
  const [taskData, setTaskData] = useState(null);

  const isLoading = useMemo(() => !taskData, [taskData])

  const getTasksData = async () => {
    try {
      let data = await getAppData()
      setTaskData({ task1: data.task1, task2: data.task2 });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTasksData();
  }, [])


  return (
    <div className="app-container">
      <span className="app-header">
        TIKAL Assignment
      </span>
      <div className="app-box">
        {isLoading ?
          <Loader /> :
          <>
            <Task1 {...taskData.task1} /> <div className="divider" /><Task2 {...taskData.task2} />
          </>}
      </div>
    </div>
  );
}

export default App;
