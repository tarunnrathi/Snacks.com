import React from "react";
import "./zipcodeBox.scss";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import { Button, Popover, Tooltip } from "@mui/material";

const ZipcodeBox = ({
  zipPopoverOpen,
  updatedZipCode,
  zipPopover,
  zipPopoverClose,
  zipPopoverUpdate,
  checkZipcode,
  anchorEl,
}) => {
  let isShipto =
    window.location.pathname === "/" ||
    window.location.pathname === "/home" ||
    window.location.pathname === "/shopbycategory" ||
    window.location.pathname === "/productlist" ||
    window.location.pathname === "/varietypack" ||
    window.location.pathname === "/holidayshop" ||
    window.location.pathname === "/cart" ||
    window.location.pathname === "/flaminhot";
  return (
    <>
      <div className={`zipcodebox`}>
        <span className="shipto-icon">
          <RoomOutlinedIcon />
        </span>
        <span className="shipto-text">Ship To</span>
        <span id="shipto-zip" className="shipto-zip">
          {updatedZipCode || sessionStorage.getItem("Zipcode")}{" "}
        </span>
        <Tooltip placeholder="top" title="Location">
          <Button
            aria-controls="shipto-zip"
            aria-expanded={zipPopover}
            aria-haspopup="true"
            className={
              zipPopover
                ? "btn-mui btn-outlined shipto-btn open"
                : "btn-mui btn-outlined shipto-btn"
            }
            disabled={!isShipto ? true : false}
            onClick={(e) => zipPopoverOpen(e)}
            role="button"
          >
            <span className="change-text">Change</span>
          </Button>
        </Tooltip>
        <Popover
          id="shipto"
          className="popover-zip"
          classes={{
            paper: "popover-zip-paper",
          }}
          anchorEl={anchorEl}
          keepMounted
          open={zipPopover}
          onClose={(e) => zipPopoverClose(e)}
        >
          <div>
            <label htmlFor="zipcode" className="label-hidden">
              change zipcode
            </label>
            <input
              type="text"
              onChange={(e) => checkZipcode(e)}
              id="zipcode"
              defaultValue={sessionStorage.getItem("Zipcode")}
              maxLength="5"
              pattern="\d*"
            />
          </div>
          <div className="button-group">
            <Button
              className="update-btn small-btn"
              aria-label="click on update to change the zip code"
              onClick={(e) => zipPopoverUpdate(e)}
            >
              Update
            </Button>
            <Button
              className="cancel-btn small-btn"
              aria-label="click on cancel if you don't want to change the zip code"
              onClick={(e) => zipPopoverClose(e)}
            >
              Cancel
            </Button>
          </div>
        </Popover>
      </div>
    </>
  );
};

export default ZipcodeBox;
