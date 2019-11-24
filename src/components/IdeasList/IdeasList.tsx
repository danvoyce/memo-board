import React from 'react';
import IdeaItem from './IdeaItem';
import styles from './IdeasList.module.css';

interface IdeasListProps {
  data: EnumIdeaItems;
  onUpdate: (values: EnumIdeaItem) => void;
  onAddNewIdea: () => void;
  onDeleteIdea: (id: string) => void;
}

const IdeasList = ({
  data = [],
  onUpdate,
  onDeleteIdea,
  onAddNewIdea
}: IdeasListProps) => {
  const handleUpdate = (values: EnumIdeaItem) => {
    onUpdate(values);
  };

  const handleDeleteIdea = (id: string) => {
    onDeleteIdea(id);
  };

  const renderAddNewItemButton = () => {
    return (
      <li key="addBtn">
        <button
          className={styles.addButton}
          onClick={onAddNewIdea}
          title="Add a new idea"
          data-testid="add-button"
        >
          <span className={styles.addButtonIcon} />
        </button>
      </li>
    );
  };

  const renderListItems = () => {
    const listItems = data.map(({ id, title, body, created_date }, i) => {
      const shouldAutoFocus = !title && i === 0;
      return (
        <li key={id} data-testid="idea-item">
          <IdeaItem
            title={title}
            body={body}
            id={id}
            created_date={created_date}
            onUpdate={values => handleUpdate(values)}
            shouldAutoFocus={shouldAutoFocus}
            onDeleteIdea={() => handleDeleteIdea(id)}
          />
        </li>
      );
    });

    listItems.unshift(renderAddNewItemButton());

    return listItems;
  };

  return <ol className={styles.list}>{renderListItems()}</ol>;
};

export default IdeasList;
