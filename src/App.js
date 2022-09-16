import { data } from "./data";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";

function App() {
  //state to store the data
  const [dataFetched, setDataFetched] = useState([...data]);

  const handleChange = (e) => {
    const { name, checked } = e.target; //extracting the name and checked property from selected item
    //console.log(name);

    //if its a course ie select all button then looping over all the branches of the course and mutating the isChecked to either true or false depending on the checked value, later updating the whole objects isChecked value
    if (name === "Btech" || name === "Law" || name === "Medical") {
      let tempData = dataFetched.map((data) => {
        let branches =
          name === data.course
            ? data.branches.map((branch) => {
                return { ...branch, isChecked: checked };
              })
            : data.branches;
        return {
          ...data,
          branches,
          isChecked: !branches.some(
            (branch) => branch?.isChecked !== true // checking if any of the branchs' isChecked value is not true, if all true then only setting it to true otherwise false
          ),
        };
      });
      setDataFetched(tempData); //saving the processed data to our state
      //console.log(tempData);
      //console.log(dataFetched);
    }
    // if the selected item is just a branch then mutating only the branchs isChecked value
    else {
      let tempData = dataFetched.map((data) => {
        let branches = data.branches.map((branch) =>
          branch.branchName === name
            ? { ...branch, isChecked: checked }
            : { ...branch }
        );
        return {
          ...data,
          branches,
          isChecked: !branches.some((branch) => branch?.isChecked !== true),
        };
      });
      setDataFetched(tempData);
      //console.log(tempData);
      //console.log(dataFetched);
    }
  };

  const openChatFn = () => {
    window?.Wotnot?.open();
  };
  return (
    <div className="App">
      {/******************* randering the checkbox form ************************/}
      <div className="mx-4 my-4">
        <form className="form w-100">
          <h3>Select Courses and Branches</h3>

          {dataFetched.map(({ course, branches, id }) => {
            return (
              <>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={course}
                    checked={
                      !branches.some((branch) => branch?.isChecked !== true)
                    }
                    onChange={handleChange}
                    key={id}
                  />
                  <label className="form-check-label ms-2">{course}</label>
                </div>

                {branches.map((branch, id) => {
                  return (
                    <div className="form-check" style={{ marginLeft: "20px" }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name={branch.branchName}
                        checked={branch?.isChecked || false}
                        onChange={handleChange}
                        key={id}
                      />
                      <label className="form-check-label ms-2">
                        {branch.branchName}
                      </label>
                    </div>
                  );
                })}
              </>
            );
          })}
        </form>
      </div>

      {/******************* diplaying the  selected items *****************/}
      <div style={{ padding: "20px" }}>
        {dataFetched.map((data) => {
          return data.isChecked === true ? (
            <button className="chip-btn">
              {data.course + " All branches"}
            </button>
          ) : (
            data.branches.map((branch) => {
              return (
                branch.isChecked === true && (
                  <button className="chip-btn">{branch.branchName}</button>
                )
              );
            })
          );
        })}

        <br></br>
        <br></br>

        <button onClick={openChatFn}>Open Chat</button>
      </div>
    </div>
  );
}

export default App;
