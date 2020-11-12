import React from 'react';
import Character from "./Character";
import {Droppable} from "react-beautiful-dnd";
import './../scss/Container.scss'

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightwhite",
});

const Container = ({filterData, value, openModal, removeFromList, changeName}) => {
    return (
        <div className="container col s3">
            <div className="row">
                <span className='title col s12'>{value}</span>
                <button className="waves-light btn-small" onClick={() => openModal(value)}>Add Character
                </button>
            </div>
            <Droppable droppableId={value}>
                {(provided, snapshot) => (
                    <div  {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}>
                        {filterData(value).map((item, index) => (
                            <Character
                                item={item}
                                key={item.id}
                                index={index}
                                removeFromList={removeFromList}
                                changeName={changeName}
                                getListStyle={getListStyle}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>


    );
};

export default Container;
