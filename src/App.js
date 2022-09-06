import "./styles/app.css"
import "./styles/mobile.css"
import Task1 from "./components/Task1";
import Task2 from "./components/Task2";
import Loader from "./components/Loader"
import { useEffect, useMemo, useState } from "react";
import { CHARACTERS_COUNT_QUERY, CHARACTERS_BY_IDS_QUERY, MAX_PER_PAGE, CHARACTERS } from "./utils/query";
import { useLazyQuery, useQuery } from "@apollo/client/react";

function App() {
  const [taskData, setTaskData] = useState(null);
  const { loading: countLoading, data: countData } = useQuery(CHARACTERS_COUNT_QUERY)
  const [GetCharactersByIds, { loading: dataLoading, data: charactersData }] = useLazyQuery(
    CHARACTERS_BY_IDS_QUERY,
    { variables: { ids: Array(countData?.characters?.info?.count).fill(1).map((n, i) => n + i).join(',') } }
  );

  const isLoading = useMemo(() => dataLoading || !taskData, [dataLoading, taskData])

  const getTasksData = async () => {
    try {
      if (!charactersData?.charactersByIds?.length) return
      let characters = charactersData.charactersByIds.map((chr) => { return { name: chr.name, origin: chr.origin.name, dimension: chr.origin.dimension, popularity: chr.episode.length } })
      let charactersTmp = characters.filter((chr) => chr.origin?.includes("Earth (C-137)"))
      let characterMinShows = Math.min(...charactersTmp.map((chr) => chr.popularity))

      let charactersTask1 = charactersTmp.filter(chr => {
        return chr.popularity === characterMinShows
      })

      let charactersDict = {}
      characters.filter(chr => CHARACTERS.includes(chr.name)).forEach((chr) => { charactersDict[chr.name] = charactersDict[chr.name] ? charactersDict[chr.name] + chr.popularity : chr.popularity })

      let charactersTask2 = Object.entries(charactersDict).map(([name, popularity]) => { return { name, popularity } });;

      let task1 = { characters: charactersTask1, pages: Math.ceil(charactersTask1.length / MAX_PER_PAGE) }
      let task2 = { characters: charactersTask2 }

      setTaskData({ task1: { ...task1 }, task2 });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!countLoading) {
      GetCharactersByIds()
    }
  }, [countLoading, GetCharactersByIds])


  useEffect(() => {
    if (!dataLoading) {
      getTasksData();
    }
  }, [dataLoading])


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
