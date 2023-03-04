import React from "react";
import Option from "../components/test/Option";
import { shallow } from "enzyme";
import { FormControlLabel } from "@material-ui/core";

describe("Option component tests", () => {
  it("renders Option component without crashing", () => {
    shallow(
      <Option text="option A" isSelected={false} handleChange={jest.fn()} />
    );
  });

  it("handle change triggers", () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <Option text="option A" isSelected={false} handleChange={handleChange} />
    );
    wrapper
      .find(FormControlLabel)
      .prop("control")
      .props.onChange({ target: { checked: true }, persist: jest.fn() });
    expect(handleChange).toHaveBeenCalled();
  });
});
