import React, { Component } from "react";
import IdeaItem from "./IdeaItem";
import styles from "./IdeasList.module.css";

interface EnumIdeaItem {
  id: string;
  title: string;
  body: string;
  created_date: string;
}

interface EnumIdeaItems extends Array<EnumIdeaItem> {}

interface props {
  data: EnumIdeaItems;
  onUpdate: ((values: EnumIdeaItem) => void);
  onAddNewIdea: (() => void);
  onDeleteIdea: ((id: string) => void);
}

class IdeasList extends Component<props> {
  handleUpdate(values: any) {
    this.props.onUpdate(values);
  }

  handleDeleteIdea(id: string) {
    this.props.onDeleteIdea(id);
  }

  renderAddNewItemButton() {
    return (
      <li key="addBtn">
        <button
          className={styles.addButton}
          onClick={this.props.onAddNewIdea}
          title="Add a new idea"
          data-test="add-button"
        >
          <span className={styles.addButtonIcon} />
        </button>
      </li>
    );
  }

  render() {
    const { data = [] } = this.props;

    const listElements = data.map(({ id, title, body, created_date }, i) => {
      const shouldAutoFocus = !title && i === 0;
      return (
        <li key={id}>
          <IdeaItem
            title={title}
            body={body}
            onUpdate={values => this.handleUpdate({ ...values, id })}
            shouldAutoFocus={shouldAutoFocus}
            onDeleteIdea={() => this.handleDeleteIdea(id)}
          />
        </li>
      );
    });

    listElements.unshift(this.renderAddNewItemButton());

    return (
      <ol className={styles.list} data-test="ideas-list">
        {listElements}
      </ol>
    );
  }
}

export default IdeasList;
