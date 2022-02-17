import * as React from "react";
import { useEffect, useState } from "react";
import styles from "./crud.module.scss";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { FaRegEdit as EditIcon, FaTimes as DeleteIcon } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Button } from "@material-ui/core";
import getData from "../../features/data/getData";
import deleteListItem from "../../features/data/controls/deleteListItem";
import { FormModal } from "../FormModal/FormModal";

export const Crud = (context: any) => {
  interface IData {
    value: any;
  }
  const defaultState = {
    value: [],
  };
  // Get data
  const [data, setData] = useState<IData>(defaultState);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const fetchData = async () => {
    setData(await getData(context.context, ""));
  };
  useEffect(() => {
    fetchData();
    sp.setup({
      spfxContext: context.context,
    });
    setDataIsLoading(false);
  }, []);
  // Modal
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false),
      setEditItemModalOpen(false),
      setAddNewItemModal(false),
      setSelectedItem([]);
  };
  // Edit list item
  const [editItemModalOpen, setEditItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    Array<{
      title: any;
      other: any;
      user: any;
    }>
  >([]);
  const editListItem = () => {
    setEditItemModalOpen(true);
    handleModalOpen();
  };
  const handleItemUpdate = async (title, other, user) => {
    const filteredItem = await data.value.find(
      (obj) => obj.Title === selectedItem[0].title
    );
    let list = sp.web.lists.getByTitle("arm_listas");
    const i = await list.items.getById(filteredItem.Id).update(
      user
        ? {
            Title: title,
            ttt: other,
            userinisId: user,
          }
        : {
            Title: title,
            ttt: other,
            userinisId: null,
          }
    );
    fetchData();
    handleModalClose();
  };
  // Add new list item
  const [addNewItemModal, setAddNewItemModal] = useState(false);
  const buttonAddNew = () => {
    setAddNewItemModal(true);
    handleModalOpen();
  };
  const handleAddItem = async (title, other, user) => {
    {
      title !== "" &&
        other !== "" &&
        user !== "" &&
        (await sp.web.lists.getByTitle("arm_listas").items.add({
          Title: title,
          ttt: other,
          userinisId: user,
        }));
    }
    fetchData();
    handleModalClose();
  };
  return (
    <div className={styles.crud}>
      <h1 className={styles.crudTitle}>My list</h1>
      <table className={styles.crudTable}>
        <thead>
          <tr>
            <th className={styles.crudTableRowItem}>Title</th>
            <th className={styles.crudTableRowItem}>Other</th>
            <th className={styles.crudTableRowItem}>User</th>
            <th className={styles.crudTableRowItem}>Edit</th>
            <th className={styles.crudTableRowItem}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.value?.length !== 0 &&
            data.value?.map((item) => {
              return (
                <tr key={item.Id}>
                  <td className={styles.crudTableRowItem}>{item.Title}</td>
                  <td className={styles.crudTableRowItem}>{item.ttt}</td>
                  <td className={styles.crudTableRowItem}>
                    {item.userinis?.Title !== undefined ? (
                      item.userinis?.Title
                    ) : (
                      <i>User not specified</i>
                    )}
                  </td>
                  <td className={styles.crudTableRowItem}>
                    <button
                      onClick={() => {
                        setSelectedItem((prevState) => [
                          ...prevState,
                          {
                            title: item.Title,
                            other: item.ttt,
                            user: item.userinisStringId,
                          },
                        ]);
                        editListItem();
                      }}
                      className={styles.crudTableButton}
                    >
                      <IconContext.Provider value={{ size: "1.2rem" }}>
                        <div
                          style={{ marginLeft: "0.3rem" }}
                          className={styles.crudTableButtonIcon}
                        >
                          <EditIcon />
                        </div>
                      </IconContext.Provider>
                    </button>
                  </td>
                  <td className={styles.crudTableRowItem}>
                    <button
                      // deleteListItem function is specified in data/controls
                      onClick={() => deleteListItem(item.Id, setData, data)}
                      className={styles.crudTableButton}
                    >
                      <IconContext.Provider value={{ size: "1.2rem" }}>
                        <div
                          style={{ marginTop: "0.3rem" }}
                          className={styles.crudTableButtonIcon}
                        >
                          <DeleteIcon />
                        </div>
                      </IconContext.Provider>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Button
        onClick={buttonAddNew}
        className={styles.crudButtonAddNew}
        variant="outlined"
      >
        Add new
      </Button>
      <FormModal
        context={context.context}
        handleAddItem={handleAddItem}
        handleUpdate={handleItemUpdate}
        selectedItem={selectedItem}
        editItemModalOpen={editItemModalOpen}
        addNewItemModal={addNewItemModal}
        open={openModal}
        handleModalClose={handleModalClose}
      ></FormModal>
    </div>
  );
};
