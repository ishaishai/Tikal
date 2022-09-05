import { createRef, useEffect, useState } from "react";

const Bar = ({ character }) => {
    const [popularity, setPopularity] = useState(1)
    useEffect(() => {

        if (character) {
            let element = document.getElementById(character.name)
            if (element) {
                setTimeout(() => {
                    element.style.minWidth = `24px`
                    element.style.width = `${character.popularity * 5}px`
                }, 200)
            }
        }
    }, [character])

    useEffect(() => {
        if (popularity < character.popularity) {
            console.log("🚀 ~ file: Bar.js ~ line 20 ~ useEffect ~ popularity", popularity)
            setTimeout(() => {
                setPopularity(popularity + 1)

            }, Math.floor(3500 / character.popularity))
        }
    }, [popularity])

    return <div className="bar">
        <div className="bar-name">
            {character.name}
        </div>
        <div className="bar-popularity" id={character.name} key={character.name}>
            {popularity}
        </div>
    </div>
}

export default Bar;