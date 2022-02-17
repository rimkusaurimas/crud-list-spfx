import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./form-modal.module.scss";
import { Box, Modal } from "@material-ui/core";
import { Form } from "./Form/Form";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { IoIosClose } from "react-icons/io";
import { IconButton } from "@material-ui/core";
import { IconContext } from "react-icons";

export const FormModal = ({
  handleModalClose,
  open,
  editItemModalOpen,
  addNewItemModal,
  handleUpdate,
  handleAddItem,
  selectedItem,
  context,
}) => {
  const [selectedUser, setSelectedUser] = useState([]);

  const getUser = async () => {
    const users = await sp.web.siteUsers();
    const selectedUserId = parseInt(selectedItem[0]?.user);
    const filteredUser = users.filter((user) => user.Id === selectedUserId);
    setSelectedUser(filteredUser);
  };

  useEffect(() => {
    getUser();
  }, [open]);

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modalBox}>
            <IconButton
              onClick={handleModalClose}
              className={styles.modalBoxExitIcon}
            >
              <IconContext.Provider value={{ size: "2rem" }}>
                <IoIosClose />
              </IconContext.Provider>
            </IconButton>
            {editItemModalOpen && (
              <Form
                formTitle="Edit user"
                context={context}
                handleModalClose={handleModalClose}
                buttonText="Update item"
                handle={handleUpdate}
                titlePlaceholder={selectedItem[0]?.title}
                otherPlaceholder={selectedItem[0]?.other}
                userPlaceholder={selectedUser[0]?.Title}
                userPlaceholderId={selectedItem[0]?.user}
              />
            )}
            {addNewItemModal && (
              <Form
                context={context}
                formTitle="Add new user"
                buttonText="Add item"
                handle={handleAddItem}
              />
            )}
          </Box>
        </Modal>
      )}
    </>
  );
};
