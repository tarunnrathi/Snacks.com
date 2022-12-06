import React, { memo, useEffect, useRef } from "react";
// library
import CloseIcon from '@mui/icons-material/Close';
import "./NavSearchBar.scss";
// common
import FormField from "../formfield/FormField2";
import { Button, FormGroup } from "@mui/material";

const NavSearchBar = React.forwardRef(
  (
    {
      searchText,
      handleFormChange,

      clearSearch,
      handleSearch,

      theme,
    },
    ref
  ) => {
    useEffect(() => {}, []);

    return (
      <>
        <FormGroup
          row
          ref={ref}
          className="nav-search-formgroup"
          role="search"
          aria-label="search snacks"
        >
          <FormField
            name="searchText"
            type="search"
            placeholder="Search for items or brands"
            onChange={(e) => handleFormChange(e)}
            onKeyPress={(e) => handleFormChange(e)}
            value={searchText}
            inputProps={{
              "aria-label": "Search for items or brands",
            }}
            InputLabelProps={{
              className: "form-label-nav",
            }}
            classes={{
              root: "nav-search",
            }}
            size="small"
            hiddenLabel={true}
            endIcon={
              <>
                {searchText ? (
                  <Button
                    className={`btn-mui clear-icon`}
                    variant="contained"
                    disableElevation
                    onClick={() => clearSearch()}
                    aria-label="clear search"
                  >
                    <CloseIcon />
                  </Button>
                ) : null}
                <Button
                  className={`btn-mui ${theme}`}
                  role="button"
                  // id="nav-search-btn"
                  variant="contained"
                  disableElevation
                  onClick={(e) => handleSearch(e)}
                  aria-label="search"
                >
                  <img src="/svg/search.svg" alt="search" />
                </Button>
              </>
            }
          />
        </FormGroup>
      </>
    );
  }
);

export default memo(NavSearchBar);
