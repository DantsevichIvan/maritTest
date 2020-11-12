import React from 'react';
import Modal from "react-modal";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

const customStyles = {
    content: {
        width: '40%',
        height: '50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 22,
        position: 'relative'
    }
};
const ModalWindow = ({modalIsOpen, closeModal, title, handleSubmit}) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
            contentLabel="Example Modal"
        >

            <button className="waves-effect waves-light btn" onClick={closeModal}>close</button>
            <div className="modal-content row">
                <form className="col s12" onSubmit={handleSubmit}>
                    <h4 id="title">{title}</h4>
                    <div className="input-field col s12">
                        <input id="name" type="text" className="validate"/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Add</button>
                </form>
            </div>

        </Modal>
    );
};

export default ModalWindow;
