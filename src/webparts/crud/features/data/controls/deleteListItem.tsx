import { sp } from "@pnp/sp";

const deleteListItem = async (id, setData, data) => {
  await sp.web.lists.getByTitle("arm_listas").items.getById(id).delete();
  const filteredItems = data.value.filter((item) => !(item.Id === id));
  const newStateObj = { value: filteredItems };
  setData(newStateObj);
};

export default deleteListItem;
