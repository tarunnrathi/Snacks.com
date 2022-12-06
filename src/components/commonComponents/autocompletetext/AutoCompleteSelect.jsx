import React, { useState } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Autocomplete, TextField } from "@mui/material";
import { withStyles } from '@mui/styles';
// styling
const styles = (theme) => ({
  asterisk: {
    color: "red",
  },
});

function AutoCompleteSelect(props) {
  const { classes } = props;
  const disableField = props.disableField || false;
  const [anchorTop, setAnchorTop] = useState();
  const [anchorLeft, setAnchorLeft] = useState();
  const setDropdownPos = (event) => {
    setAnchorTop(
      document.getElementById(props.id) &&
        document.getElementById(props.id).getBoundingClientRect().top +
          window.pageYOffset +
          42
    );
    setAnchorLeft(
      document.getElementById(props.id) &&
        document.getElementById(props.id).getBoundingClientRect().left - 10
    );
    setTimeout(() => {
      document.getElementById(props.id).setAttribute("aria-expanded", "true");
    }, 110);
  };
  const setDropdownClose = () => {
    setTimeout(() => {
      document.getElementById(props.id).setAttribute("aria-expanded", "false");
    }, 110);
  };
  setTimeout(() => {
    try {
      var x, i;
      x = document.querySelectorAll(".react-select-theme input");
      for (i = 0; i < x.length; i++) {
        x[i].setAttribute("role", "combobox");
        x[i].setAttribute("aria-required", "true");
        x[i].setAttribute("aria-expanded", "false");
      }
    } catch (err) {
      console.log("combobox error");
    }
  }, 100);
  const buttonOption = (
    <div
      role="alert"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      No Option
    </div>
  );
  const noOption = (
    <div
      role="alert"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      No Option
    </div>
  );
  return (
    <Autocomplete
      debug={false}
      id={props.id}
      name={props.id}
      onChange={props.onChange}
      onBlur={props.onBlur}
      size="medium"
      disabled={disableField}
      disableListWrap={disableField}
      fullWidth
      className="react-select-theme react-select-big required"
      options={props.options}
      value={props.defaultValue || ""}
      getOptionLabel={(option) => option.label || ""}
      noOptionsText={!props.defaultValue ? buttonOption : noOption}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
          error={props.iserror ? true : false}
          helperText={props.iserror ? props.errormessage : ""}
          fullWidth
          label={props.label + ""}
          variant="outlined"
          // role="combobox"
          InputLabelProps={{
            style: { fontSize: 15 },
            classes: {
              asterisk: classes.asterisk,
            },
          }}
        />
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.label, inputValue);
        const parts = parse(option.label, matches);

        return (
          <div>
            {parts.map((part, index) => (
              <span
                key={index}
                style={{ fontWeight: part.highlight ? 700 : 400 }}
              >
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
      aria-labelledby={props.id}
      onOpen={setDropdownPos}
      onClose={setDropdownClose}
    />
  );
}

export default withStyles(styles)(AutoCompleteSelect);
