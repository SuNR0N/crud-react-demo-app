import * as React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'reactstrap';

export interface IProps extends ModalProps {
  cancelButtonText?: string;
  confirmButtonText?: string;
  htmlContent?: string;
  onConfirm?: () => void;
  title?: string;
}

export const ConfirmationModal: React.SFC<IProps> = (props) => {
  const {
    cancelButtonText = 'Cancel',
    confirmButtonText = 'Delete',
    htmlContent,
    onConfirm,
    title = 'Confirmation',
    ...modalProps
  } = props;
  let className = 'confirmation-modal';
  if (props.className) {
    className = `${className} ${props.className}`;
  }

  return (
    <Modal
      {...modalProps}
      className={className}
      centered={true}
    >
      <ModalHeader
        toggle={modalProps.toggle}
        tag="h4"
      >
        {title}
      </ModalHeader>
      <ModalBody>
        {htmlContent &&
          <div
            dangerouslySetInnerHTML={{
              __html: htmlContent,
            }}
          />
        }
        {modalProps.children}
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          onClick={modalProps.toggle}
        >
          {cancelButtonText}
        </Button>
        <Button
          color="danger"
          onClick={onConfirm ? onConfirm : modalProps.toggle}
        >
          {confirmButtonText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};