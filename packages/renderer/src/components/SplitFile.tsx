import { useState } from "react";
import "./SplitFile.css";

const SplitFile = () => {
  return (
    <>
      <label htmlFor="input-file">Split</label>
      <br />
      <input
        type="file"
        id="input-file"
        name="input-file"
      />
    </>
  );
};
export default SplitFile;
