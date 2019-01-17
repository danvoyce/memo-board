import React from "react";
import { mount } from "enzyme";
import App from "./App";

it("CREATES a new blank idea when the add button is clicked and autofocuses the title field", () => {
  const wrapper = mount(<App />);

  expect(wrapper.find("IdeaItem").length).toBe(2);

  const button = wrapper.find('[data-test="add-button"]');

  button.props().onClick();

  wrapper.update();

  expect(wrapper.find("IdeaItem").length).toBe(3);

  const firstItem = wrapper.find("IdeaItem").at(0);
  const titleField = firstItem.find('[data-test="title-field"]');
  const bodyField = firstItem.find('[data-test="body-field"]');

  expect(titleField.props().value).toBeFalsy();
  expect(bodyField.props().value).toBeFalsy();
  expect(titleField.props().autoFocus).toBe(true);
});

it("UPDATES the `ideasData` when an idea has been updated", () => {
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

it("DELETES an idea when the delete button is clicked", () => {
  const wrapper = mount(<App />);

  expect(wrapper.find("IdeaItem").length).toBe(2);
  expect(
    wrapper
      .find("IdeaItem")
      .at(0)
      .props().title
  ).toBe("Learn TypeScript");

  const button = wrapper.find('[data-test="delete-button"]').at(0);

  button.props().onClick();

  wrapper.update();

  expect(wrapper.find("IdeaItem").length).toBe(1);

  expect(
    wrapper
      .find("IdeaItem")
      .at(0)
      .props().title
  ).toBe("Come up with more ideas!");
});
