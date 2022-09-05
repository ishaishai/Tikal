import { useMemo, useState } from "react";
import { MAX_PER_PAGE } from "../utils/query";

const Task1 = ({ characters, pages }) => {
    const hasCharacters = useMemo(() => characters && characters.length,[characters]);
    const minShows = useMemo(() => hasCharacters && characters[0]?.popularity,[hasCharacters,characters]);
    const [currentPage, setCurrentPage] = useState(1)
    const isNextDisabled = useMemo(() => currentPage === pages - 1,[currentPage,pages])
    const isPrevDisabled = useMemo(() => currentPage === 1,[currentPage])
    const nextPage = useMemo(() => currentPage < pages - 1 ? currentPage + 1 : '',[currentPage,pages])
    const prevPage = useMemo(() => currentPage > 1 ? currentPage - 1 : '',[currentPage])

    const setNextPage = () => {
        if (currentPage < pages - 1) {
            setCurrentPage(currentPage + 1)
        }

    }
    const setPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return <div className="container">
        <span className="task-header">
            Task 1: Lowest appearnances {minShows > 1 ? `were for ${minShows} episodes` : 'was for 1 episode'} - by:
        </span>
        <div className="container">
            {hasCharacters && characters.slice((currentPage) * MAX_PER_PAGE - MAX_PER_PAGE, currentPage * MAX_PER_PAGE).map((chr, idx) => {
                return <table className="data-table" key={`table_${idx}`}><tbody><tr><td> Character name </td><td>{chr.name}</td></tr>
                    <tr><td> Origin name </td><td>{chr.origin}</td></tr>
                    <tr><td> Origin dimension </td><td>{chr.dimension}</td></tr>
                    <tr><td> Popularity </td><td>{chr.popularity}</td></tr></tbody></table>
            })}

            <div className="controls-box">
                <button disabled={isPrevDisabled} onClick={setPrevPage}>Back</button>
                <div className="pages">
                    <span className="page">{prevPage}</span>
                    <span className="page current-page">{currentPage}</span>
                    <span className="page"> {nextPage}</span>
                </div>
                <button disabled={isNextDisabled} onClick={setNextPage}>Next</button>
            </div>


        </div>
    </div >
}

export default Task1;