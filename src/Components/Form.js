import {useState} from 'react';
import Item from "./Item"
import {v4 as uuidv4} from "uuid"

export default function Form(){

    const [dataArr, setDataArr] = useState([
        {txt: "Promener le chien", id:uuidv4()},
        {txt: "Sport", id:uuidv4()},
        {txt: "Apéro pote",id:uuidv4()},
        {txt: "Coder avec React", id:uuidv4()}
    ]);

    /* Pour ajouter des élements*/
    const [stateInput, setStateInput] = useState();

    /* Pour supprimer des élements*/
    const deleteElement = id => {
        // console.log(id);
        const filteredState = dataArr.filter(item => {
        return item.id !== id;
    })
    setDataArr(filteredState);
    }

    const addToDo = e => {

        /* E prevent default afin d'éviter de mettre à jours le formulaire d'ajout */
        e.preventDefault();

        /* Création d'un nouveau tableau avec les objets à l'intérieur */
        const newArr = [...dataArr]

        /* ce que l'on ajoute dans le formulaire avec les props txt et id*/
        const newToDo = {};
        newToDo.txt = stateInput;
        newToDo.id = uuidv4();

        /* Ajout de ce que l'on ajoute dans le formulaire dans le nouveau tableau */
        newArr.push(newToDo);
        setDataArr(newArr);

        setStateInput("");
    }

    const linkedInput = e => {
        setStateInput(e);
    }

    return (
        <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">
            <form className="mb-3" onSubmit={e => addToDo(e)}>
                <label htmlFor="todo" className="form-label mt-3">Chose à faire</label>
                <input type="text" className="form-control" id="todo" value={stateInput} onInput={e =>linkedInput(e.target.value)} />

                <button className="mt-2 btn btn-primary d-block">Envoyer</button>
            </form>

            <h2>Liste des choses à faire</h2>
            <ul className="list-group">
                
                {dataArr.map(item => {
                    return (<Item 
                    txt={item.txt}
                    key={item.id}
                    id={item.id}
                    delFunc={deleteElement}
                    />
                    
                        )
                })}
                
            </ul>
        </div>
    )
}