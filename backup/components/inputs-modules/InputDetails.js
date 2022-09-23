import React from "react";
// import GistAddButton from "./GistAddButton";

const InputDetails = ({ input_details, inputId, projectId }) => {
  return (
    <div>
      {/* <GistAddButton inputId={inputId} /> */}
      {input_details.data.map((input_detail, i) => {
        const {
          id: detailId,
          attributes: { detail, detail_type },
        } = input_detail;
        if (detail_type === "gist") {
          return (
            <div key={i}>
              <p>{detail}</p>
            </div>
          );
        }
        if (detail_type === "link") {
          return (
            <div key={i}>
              <h3>{detail_type}s </h3>
              <p>{detail}</p>
            </div>
          );
        }
        if (detail_type === "image") {
          return (
            <div key={i}>
              <h3>{detail_type}s </h3>
              <p>{detail}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default InputDetails;
