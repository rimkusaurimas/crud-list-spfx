import * as React from "react";
import { useState } from "react";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { TextField, Button, FormControl, FormLabel } from "@material-ui/core";
import styles from "./form.module.scss";

export const Form = (props) => {
  const [formTitle, setFormTitle] = useState(props.titlePlaceholder);
  const [formOther, setFormOther] = useState(props.otherPlaceholder);
  const [formUser, setFormUser] = useState(props.userPlaceholderId);

  const updateTitle = (e) => {
    setFormTitle(e.target.value);
  };
  const updateOther = (e) => {
    setFormOther(e.target.value);
  };
  const updateUser = (items: any[]) => {
    setFormUser(items[0]?.id);
  };
  const setNewItemInfo = () => {
    props.handle(formTitle, formOther, formUser);
  };

  return (
    <form className={styles.form}>
      <FormLabel className={styles.formTitle}>{props.formTitle}</FormLabel>
      <FormControl>
        <TextField
          onChange={updateTitle}
          className={styles.formInputsField}
          id="standard-basic"
          label="Title"
          variant="standard"
          value={formTitle}
          required
        />
        <TextField
          onChange={updateOther}
          className={styles.formInputsField}
          id="standard-basic"
          label="Other"
          variant="standard"
          value={formOther}
          required
        />
        {/* <div className={styles.formInputsPeoplePicker}> */}
          <PeoplePicker
            ensureUser={true}
            defaultSelectedUsers={[props.userPlaceholder]}
            context={props.context}
            titleText="User"
            personSelectionLimit={1}
            groupName={""}
            showtooltip={true}
            required={false}
            disabled={false}
            onChange={updateUser}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000}
          />
        {/* </div> */}
        <Button
          className={styles.formButton}
          variant="outlined"
          onClick={setNewItemInfo}
        >
          {props.buttonText}
        </Button>
      </FormControl>
    </form>
  );
};
