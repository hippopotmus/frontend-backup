import { useRef, useState } from "react";
import { getNewInputGist } from "../actions/actions-for-inputs";
import httpInstance from "../utils/http";
import "./GistList.css";

const GistList = () => {
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const inputDetailRef = useRef();

  const createGist = async (data) => {
    await httpInstance.post("/api/input-details", data);
  };

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
    const data = JSON.stringify({
      data: {
        detail: "detail",
        detail_type: "gist",
        inputs: 2,
      },
    });
    createGist(data);
  };

  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <label htmlFor="service">Service(s)</label>
        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <input
                name="service"
                type="text"
                id="service"
                ref={inputDetailRef}
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
              {serviceList.length - 1 === index && serviceList.length < 4 && (
                <button
                  type="button"
                  onClick={() => {
                    handleServiceAdd();
                    getNewInputGist(inputDetailRef.current.value);
                  }}
                  className="add-btn">
                  <span>Add a Service</span>
                </button>
              )}
            </div>
            <div className="second-division">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn">
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="output">
        <h2>Output</h2>
        {serviceList &&
          serviceList.map((singleService, index) => (
            <ul key={index}>{singleService.service && <li>{singleService.service}</li>}</ul>
          ))}
      </div>
    </form>
  );
};

export default GistList;
