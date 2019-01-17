import React from "react";
import { mount } from "enzyme";
import App from "./App";

it("updates the `ideasData` when an idea has been updated", () => {
  const wrapper = mount(<App />);

  const originalTitle = "Come up with more ideas!";
  const newTitle = "Come up with more BETTER ideas!";

  expect(wrapper.state().ideasData[1].title).toBe(originalTitle);

  const secondItem = wrapper.find("IdeaItem").at(1);
  const secondItemTitleField = secondItem.find('[data-test="title-field"]');

  secondItemTitleField.props().onChange({
    target: {
      value: newTitle
    }
  });

  secondItemTitleField.props().onBlur();

  expect(wrapper.state().ideasData[1].title).toBe(newTitle);
});
