import React, { Component } from "react";
import IdeasList from "./components/IdeasList/IdeasList";
import ideasData from "./api/ideas.fixture";

import "./App.css";

interface EnumIdeaItem {
  id: string;
  title: string;
  body: string;
  created_date: string;
}

interface EnumIdeaItems extends Array<EnumIdeaItem> {}
interface AppState {
  ideasData: EnumIdeaItems;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    // GET ideas
    // On success...
    this.state = {
      ideasData: ideasData
    };
  }

  handleUpdate = (values: EnumIdeaItem) => {
    // POST idea/update
    // On success...
    const { ideasData } = this.state;
    const cloned = ideasData.slice(0);
    const index = cloned.findIndex(({ id }) => id === values.id);

    if (index > -1) {
      cloned[index] = Object.assign({}, cloned[index], values);

      this.setState({
        ideasData: cloned
      });
    }
  };

  addNewIdea = () => {
    // GET ideas/new
    // On success...
    const { ideasData } = this.state;
    const cloned = ideasData.slice(0);
    cloned.unshift({
      id: Date.now().toString(),
      created_date: "",
      title: "",
      body: ""
    });

    this.setState({
      ideasData: cloned
    });
  };

  deleteIdea = (selectedId: string) => {
    // POST idea/delete
    // On success...
    const { ideasData } = this.state;
    const cloned = ideasData.slice(0);
    const index = cloned.findIndex(({ id }) => id === selectedId);

    if (index > -1) {
      cloned.splice(index, 1);
      this.setState({
        ideasData: cloned
      });
    }
  };

  render() {
    const { ideasData } = this.state;
    return (
      <IdeasList
        data={ideasData}
        onUpdate={this.handleUpdate}
        onAddNewIdea={this.addNewIdea}
        onDeleteIdea={this.deleteIdea}
      />
    );
  }
}

export default App;
