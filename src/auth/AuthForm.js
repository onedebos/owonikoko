import React from "react";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

export const App = props => {
  const showNotification = () => {
    NotificationManager.success("copied", "", 1000);
  };
  return (
    <div>
      <button onClick={showNotification()}>Click me!</button>
    </div>
  );
};
