import { useMemo } from "react";
import Chart from "./chart/Chart";

const Task2 = ({ characters }) => {
    const hasCharacters = useMemo(() => characters && characters.length, [characters]);

    if (!hasCharacters) return <div className="container">
        <span className="task-header error">
            Can't find characters match your terms
        </span>
    </div>
    
    return <div className="container">
        <span className="task-header">
            Task 2: Popularity of Smith's family:
        </span>
        <Chart data={characters} />
    </div>
}

export default Task2;