import React from "react";
import AddReceipt from "./AddReceipt";
//modal imports
import { Button, Modal } from "semantic-ui-react";

const ModalAddReceipt = (props) => {
  return (
    <Modal
      trigger={<Button className="formModalButton">Add New</Button>}
      centered={false}
    >
      <Modal.Header>Add Your Receipt Info</Modal.Header>
      <Modal.Content>
        <AddReceipt setCounter={props.setCounter} counter={props.counter}/>
      </Modal.Content>
    </Modal>
  );
};

export default ModalAddReceipt;
