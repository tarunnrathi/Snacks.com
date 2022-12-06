import { Button, Modal } from "@mui/material";
import React, { Component } from "react";
import { ClickedButton } from "../../../config/amplitude/SnacksAmplitude";
import {
  BUTTONNAME,
  METHOD,
} from "../../../config/amplitude/Taxonomy.constants";
import "./dialogBox.scss";

export default class DialogBox extends Component {
  render() {
    const {
      dialogOpen,
      dialogClose,
      dialogHeading,
      dialogCloseConfirm,
      ariaLabelCancel,
      ariaLabelYes,
      PageTitle,
      disableRestoreFocus
    } = this.props;
    return (
      <Modal
        open={dialogOpen}
        onClose={() => {
          ClickedButton(BUTTONNAME.CANCEL, METHOD.DELETEDIALOGBOX, {
            PageTitle,
          });
          dialogClose();
        }}
        aria-labelledby="simple-modal-title"
        className={"modal-wrapper  modal-wrapper-container"}
        scroll={"body"}
        role="dialog"
        disableRestoreFocus={disableRestoreFocus ? disableRestoreFocus: false}
      >
        <div className={"modal-wrapper modal-wrapper-container modal-paper"}>
          <div id="simple-modal-title" className="heading">
            {dialogHeading}
          </div>
          <div className="button-group">
            <Button
              aria-label={ariaLabelCancel || "cancel"}
              className="reject"
              onClick={() => {
                ClickedButton(BUTTONNAME.CANCEL, METHOD.DELETEDIALOGBOX, {
                  PageTitle,
                });
                dialogClose();
              }}
            >
              No
            </Button>
            <Button
              aria-label={ariaLabelYes || "yes"}
              className="accept"
              onClick={() => {
                ClickedButton(BUTTONNAME.YES, METHOD.DELETEDIALOGBOX, {
                  PageTitle,
                });
                dialogCloseConfirm();
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}
