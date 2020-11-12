import React, {useState} from 'react';
import {Draggable} from "react-beautiful-dnd";


const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging

    // styles we need to apply on draggables
    ...draggableStyle
});

const Character = ({item, removeFromList, changeName, index, getListStyle}) => {
    const [chang, setChang] = useState(false)
    const [value, setValue] = useState(item.name)

    function updateCharacter() {
        changeName(value, item.id)
        setChang(false)
    }

    return (
        <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    className="row center">
                    <div className="col s12">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                {chang ?
                                    <div className="input-field col s12 white-text">
                                        <input id="name" type="text" className="validate white-text" defaultValue={value}
                                               onChange={(event => setValue(event.currentTarget.value))}/>
                                        <button className="waves-effect waves-light btn"
                                                onClick={updateCharacter}>changeName
                                        </button>
                                    </div> :
                                    <span className="card-title" onClick={() => setChang(true)}>{value}</span>
                                }
                                <button className="waves-light btn" onClick={() => removeFromList(item.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>

    );
};

export default Character;
