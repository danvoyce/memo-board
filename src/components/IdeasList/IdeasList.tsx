import React, { Component } from "react";
import IdeaItem from "./IdeaItem";
import styles from "./IdeasList.module.css";

interface EnumIdeaItem {
  id: number;
  title: string;
  body: string;
  created_date?: string;
}

interface EnumIdeaItems extends Array<EnumIdeaItem> {}

interface props {
  data: EnumIdeaItems;
  onUpdate: ((values: EnumIdeaItem) => void);
}

class IdeasList extends Component<props> {
  handleUpdate(values: any) {
    this.props.onUpdate(values);
  }

  render() {
    const { data = [] } = this.props;

    return (
      <ol className={styles.list} data-test="ideas-list">
        {data.map(({ id, title, body, created_date }) => {
          return (
            <li key={id}>
              <IdeaItem
                title={title}
                body={body}
                onUpdate={values => this.handleUpdate({ ...values, id })}
              />
            </li>
          );
        })}
      </ol>
    );
  }
}

export default IdeasList;
