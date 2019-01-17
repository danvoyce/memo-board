import React, { Component } from "react";
import IdeasList from "./components/IdeasList/IdeasList";
import { fetchInitialData } from "./api/api";

import "./App.css";

interface EnumIdeaItem {
  id: number;
  title: string;
  body: string;
  created_date?: string;
}

interface EnumIdeaItems extends Array<EnumIdeaItem> {}
interface AppState {
  ideasData: EnumIdeaItems;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    const ideasData = fetchInitialData();
    this.state = {
      ideasData
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

  render() {
    const { ideasData } = this.state;
    return <IdeasList data={ideasData} onUpdate={this.handleUpdate} />;
  }
}

export default App;
