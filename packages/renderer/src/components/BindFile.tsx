import { useState } from "react";
import "./BindFile.css";

const BindFile = () => {
  return (
    <>
      <label htmlFor="horcruxes">Bind</label>
      <br />
      <input
        type="file"
        id="horcruxes"
        name="horcruxes"
        multiple
      />
    </>
  );
};
export default BindFile;
