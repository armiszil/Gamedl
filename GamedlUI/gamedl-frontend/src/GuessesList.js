import GuessesListItem from "./GuessesListItem";

export default function GuessesList({ guessedCharacters }){
    return (<table>
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Game</th>
                        <th>Franchise</th>
                        <th>Genre</th>
                        <th>Release date</th>
                    </tr>
                </thead>
                <tbody>
                {guessedCharacters.map(gussedCharacter => {
                    return (
                        <GuessesListItem key={gussedCharacter.id} guessItem={gussedCharacter}/>
                    )
                })}
                </tbody>
            </table>
    )  
}