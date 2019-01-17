import React, { Component } from "react";
import IdeasList from "./components/IdeasList/IdeasList";
import { fetchInitialData } from "./api/api";

import "./App.css";

interface EnumIdeaItem {
  id: number;
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

    const ideasData = fetchInitialData();
    this.state = {
      ideasData
    };
  }

  render() {
    const { ideasData } = this.state;
    return <IdeasList data={ideasData} />;
  }
}

export default App;
