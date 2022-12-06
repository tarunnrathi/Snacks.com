import React, { memo } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  searchField: {
    backgroundColor: "#ffffff",
  },
}));

const FormField2 = (props) => {
  const classes = useStyles();

  const configTextfield = {
    id: props.id,
    name: props.name,
    type: props.type,
    placeholder: props.placeholder,
    label: props.label,
    value: props.value,
    onChange: props.onChange,
    onKeyDown: props.onChange,
    onBlur: props.onBlur,
    disabled: props.disabled,
    required: props.required,
    InputLabelProps: props.InputLabelProps,
    classes: props.classes,
    rows: props.rows,
    rowsMax: props.rowsMax,
    fullWidth: true,
    variant: props.variant || "outlined",
    size: props.size,
    multiline: props.multiline,
    hiddenLabel: props.hiddenLabel,
    touched: props.touched ? props.touched.toString() : "false",
    InputProps: {
      endAdornment: props.endIcon ? (
        <InputAdornment position="end">{props.endIcon}</InputAdornment>
      ) : null,
      startAdornment: props.startIcon ? (
        <InputAdornment position="start">{props.startIcon}</InputAdornment>
      ) : null,
      className: classes.searchField,
    },
    inputProps: { ...props.inputProps, maxLength: props.maxLength },
  };

  if (props.error) {
    configTextfield.error = true;
    configTextfield.helperText = props.error;
  }

  return (
    <>
      <TextField {...configTextfield} autoComplete="off" />
    </>
  );
};

export default memo(FormField2);
