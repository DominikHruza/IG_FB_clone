import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { RouteComponentProps, RouteProps } from 'react-router-dom';

interface ModalProps {
  showModal: boolean;
  routeProps: RouteComponentProps;
}

export const ModalComp: React.FunctionComponent<ModalProps> = ({
  showModal,
  routeProps: { history, location },
}) => {
  const [show, setShow] = useState(showModal);

  return ReactDOM.createPortal(
    <div onClick={() => history.push(location.pathname)}>
      (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>,
    document.querySelector<any>('#modal')
  );
};

export default ModalComp;
