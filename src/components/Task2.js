import Chart from "./chart/Chart";

const Task2 = ({ characters }) => {
    return <div className="container">
        <span className="task-header">
            Task 2: Popularity of Smith's family:
        </span>
        <Chart data={characters} />
    </div>
}

export default Task2;