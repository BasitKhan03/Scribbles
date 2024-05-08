import React from "react";
import { BsCheckCircleFill, BsExclamationTriangleFill } from "react-icons/bs";
import "./Alert.css";

export default function Alert(props) {
  // const capitalizeLetter = (word)=> {
  //   const lower = word.toLowerCase();
  //   return lower.charAt(0).toUpperCase() + lower.slice(1);
  // }

  return (
    <div>
      {props.alert && (
        <div>
          <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show`}
            role="alert"
            style={{ borderRadius: "5px" }}
          >
            <strong style={{ position: "relative", top: "-3px" }}>
              {props.alert.type === "danger" ? (
                <BsExclamationTriangleFill className="alertIcon" />
              ) : (
                <BsCheckCircleFill className="alertIcon" />
              )}
            </strong>{" "}
            {props.alert.msg}
          </div>
        </div>
      )}
    </div>
  );
}
