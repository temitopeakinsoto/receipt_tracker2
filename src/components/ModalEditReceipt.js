import React from "react";
import AddReceipt from "./AddReceipt";
import EditReceipt from'./EditReceipt';

//modal imports
import { Button, Modal } from "semantic-ui-react";

const ModalAddReceipt = (props) => {
  return (
    <Modal
      trigger={<div className="editCard">Edit</div>}
      centered={false}
    >
      <Modal.Header>Edit Your Receipt Info</Modal.Header>
      <Modal.Content>
        <AddReceipt setCounter={props.setCounter} counter={props.counter}/>
        <EditReceipt setCounter={props.setCounter} counter={props.counter}/>
      </Modal.Content>
    </Modal>
  );
};

export default ModalAddReceipt;