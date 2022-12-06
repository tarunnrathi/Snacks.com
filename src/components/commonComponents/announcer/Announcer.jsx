import React from "react";
import "./Announcer.scss";
function Announcer({ messageAnnounce }) {
  return (<div className="hidden-text" aria-live="assertive" >
    {messageAnnounce}
  </div>)
}
export default React.memo(Announcer);
