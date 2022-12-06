import { Button, Dialog, DialogContent } from "@mui/material";
import React, { Component } from "react";
export default class SomethingWrongAlert extends Component {
  render() {
    const { dialougeBoxOpen, updateDialogState } = this.props;
    return (
      <Dialog
        open={dialougeBoxOpen}
        onClose={updateDialogState}
        aria-labelledby="responsive-dialog-title"
        maxWidth={false}
        classes={{
          paper: "modal-container",
          root: "modal-stack-top",
        }}
      >
        <DialogContent>
          <div style={{ textAlign: "center" }}>
            <h2>Something went Wrong</h2>
          </div>
        </DialogContent>
        <Button
          id="errorCatchList"
          aria-label="error Catch List"
          onClick={updateDialogState}
        >
          Close
        </Button>
      </Dialog>
    );
  }
}
