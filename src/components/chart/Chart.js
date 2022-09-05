import Bar from "./Bar";

const Chart = ({ data }) => {

    return <div className="container">
        <div className="chart">
            {data.map((chr, idx) => <Bar key={idx} character={chr} />)}
        </div>
    </div>
}

export default Chart;