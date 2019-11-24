import React, { Component } from 'react';
import IdeaItem from './IdeaItem';
import styles from './IdeasList.module.css';

interface props {
  data: EnumIdeaItems;
  onUpdate: (values: EnumIdeaItem) => void;
  onAddNewIdea: () => void;
  onDeleteIdea: (id: string) => void;
}

class IdeasList extends Component<props> {
  handleUpdate(values: EnumIdeaItem) {
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
          data-testid="add-button"
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
        <li key={id} data-testid="idea-item">
          <IdeaItem
            title={title}
            body={body}
            id={id}
            created_date={created_date}
            onUpdate={values => this.handleUpdate(values)}
            shouldAutoFocus={shouldAutoFocus}
            onDeleteIdea={() => this.handleDeleteIdea(id)}
          />
        </li>
      );
    });

    listElements.unshift(this.renderAddNewItemButton());

    return <ol className={styles.list}>{listElements}</ol>;
  }
}

export default IdeasList;
