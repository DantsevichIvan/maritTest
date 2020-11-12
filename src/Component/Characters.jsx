import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import openSocket from 'socket.io-client'
import Container from "./Container";
import ModalWindow from "./ModalWindow";
import {
    addCharacter,
    changeNameCharacter,
    changeRaceCharacter,
    errorMessage,
    getData,
    removeCharacter
} from "../reducers/charactersReducer";
import './../scss/Characters.scss'
import {DragDropContext} from "react-beautiful-dnd";
import {resetServerContext} from "react-beautiful-dnd"

const socket = openSocket('http://testapi.marit.expert:3003', {
    transports: ['websocket'],
    cookie: true
})


const Characters = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.isAuth)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const dataArr = useSelector(state => state.characters.data)
    const message = useSelector(state => state.characters.message)


    useEffect(() => {
        socket.send({cmd: 'get_list'}, function (res) {
            dispatch(getData(res))
        })
    }, [])
    if (!auth) {
        return <Redirect to={'/login'}/>
    }

    function filterData(value) {
        return dataArr.filter((el) => {
            return el.race === value
        })
    }

    function openModal(value) {
        setIsOpen(true);
        setTitle(value)
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleSubmit(event) {
        event.preventDefault()
        let race = document.getElementById('title').innerHTML
        let name = event.currentTarget.name.value
        socket.send(
            {
                cmd: 'add_in_list',
                data: {name: name, race: race}
            },
            data => {
                if (data.success) {
                    let newItem = {
                        name: name,
                        race: race,
                        id: Math.floor(Math.random() * Math.floor(100))
                    }

                    dispatch(addCharacter(newItem))
                } else {
                    dispatch(errorMessage(data.err))
                }
            }
        )
        setIsOpen(false);
    }

    function removeFromList(id) {
        socket.send({
                cmd: 'remove_from_list',
                data: {id: id}
            },
            data => {
                if (data.succes) {
                    console.log(dataArr.filter(item => item.id !== id))
                    dispatch(removeCharacter(id))
                } else {
                    dispatch(errorMessage(data.err))
                }
            }
        )
    }

    function changeName(name, id) {
        socket.send(
            {cmd: 'edit_in_list', data: {id: id, name: name}},
            data => {
                if (data.success) {
                    let payload = {
                        id: id,
                        name: name
                    }
                    dispatch(changeNameCharacter(payload))
                } else {
                    dispatch(errorMessage(data.err))
                }
            }
        )
    }
    const reorder = (list, startIndex, endIndex) =>{
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }
    const onDragEnd = result => {
        const {source, destination} = result
        resetServerContext()
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                filterData(source.droppableId),
                source.index,
                destination.index
            )
            console.log(filterData(source.droppableId))
            console.log(items)

        } else {
            socket.send({cmd: 'change_race', data: {id: +result.draggableId, race: destination.droppableId}},
                data => {
                if (data.success){
                    let payload = {
                        id: +result.draggableId,
                        race: destination.droppableId
                    }
                    dispatch(changeRaceCharacter(payload))
                }

                }
            )
        }

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='wrapper'>
                <div className="row center">
                    <Container
                        filterData={filterData}
                        value={'Hobbit'}
                        openModal={openModal}
                        removeFromList={removeFromList}
                        changeName={changeName}/>

                    <Container
                        filterData={filterData}
                        value={'Human'}
                        openModal={openModal}
                        removeFromList={removeFromList}
                        changeName={changeName}/>
                    <Container
                        filterData={filterData}
                        value={'Dworf'}
                        openModal={openModal}
                        removeFromList={removeFromList}
                        changeName={changeName}/>
                    <Container
                        filterData={filterData}
                        value={'Elf'}
                        openModal={openModal}
                        removeFromList={removeFromList}
                        changeName={changeName}/>
                </div>
                <span>{message}</span>
                <ModalWindow modalIsOpen={modalIsOpen} closeModal={closeModal} title={title}
                             handleSubmit={handleSubmit}/>
            </div>
        </DragDropContext>
    );
};

export default Characters;
