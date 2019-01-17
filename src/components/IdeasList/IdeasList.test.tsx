import React from "react";
import { mount } from "enzyme";
import IdeasList from "./IdeasList";
import ideasData from "../../api/ideas.fixture";

it("renders a list of ideas", () => {
  const wrapper = mount(<IdeasList data={ideasData} />);

  const list = wrapper.find('[data-test="ideas-list"]');

  expect(list.children().length).toBe(2);
});
