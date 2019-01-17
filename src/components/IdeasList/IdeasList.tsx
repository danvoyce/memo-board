import React, { Component } from "react";
import styles from "./IdeasList.module.css";

interface EnumIdeaItem {
  id: number;
  title: string;
  body: string;
  created_date: string;
}

interface EnumIdeaItems extends Array<EnumIdeaItem> {}

interface props {
  data: EnumIdeaItems;
}

class IdeasList extends Component<props> {
  render() {
    const { data = [] } = this.props;
    return (
      <ol className={styles.list} data-test="ideas-list">
        {data.map(({ id, title, body, created_date }) => {
          return <li key={id}>{title}</li>;
        })}
      </ol>
    );
  }
}

export default IdeasList;
