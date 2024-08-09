import React from "react";

const CategoryForm = ({ handleForm, value, setValue }) => {
  return (
    <>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new Category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary" onClick={handleForm}>
        Submit
      </button>
    </>
  );
};

export default CategoryForm;
