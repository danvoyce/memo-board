import React from 'react';
import IdeasList from './components/IdeasList/IdeasList';

import './App.css';

declare global {
  interface EnumIdeaItem {
    id: string;
    title: string;
    body: string;
    created_date: string;
  }

  interface EnumIdeaItems extends Array<EnumIdeaItem> {}
}

const App = () => {
  return <IdeasList />;
};

export default App;
