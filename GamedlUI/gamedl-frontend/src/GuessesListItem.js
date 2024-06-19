import "./index.css"

export default function GuessesListItem( { guessItem } ){
    return (
        <tr>
            <td className={guessItem.results.name ? "goodProp" : "badProp"}>{guessItem.character.name}</td>
            <td className={guessItem.results.role ? "goodProp" : "badProp"}>{guessItem.character.role}</td>
            <td className={guessItem.results.age ? "goodProp" : "badProp"}>{guessItem.character.age}</td>
            <td className={guessItem.results.gender ? "goodProp" : "badProp"}>{guessItem.character.gender}</td>
            <td className={guessItem.results.game.name ? "goodProp" : "badProp"}>{guessItem.character.game.name}</td>
            <td className={guessItem.results.game.franchiseName ? "goodProp" : "badProp"}>{guessItem.character.game.franchiseName}</td>
            <td className={guessItem.results.game.genre ? "goodProp" : "badProp"}>{guessItem.character.game.genre}</td>
            <td className={guessItem.results.game.releaseDate ? "goodProp" : "badProp"}>{guessItem.character.game.releaseDate}</td>
        </tr>
    )
    
}