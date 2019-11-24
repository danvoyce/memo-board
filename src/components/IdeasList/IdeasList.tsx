import React, { useState } from 'react';
import IdeaItem from './IdeaItem';
import ideasDataFixture from '../../api/ideas.fixture';
import styles from './IdeasList.module.css';

const IdeasList = () => {
  const [ideasData, setIdeasData] = useState(ideasDataFixture);

  const handleAddIdea = () => {
    const cloned = ideasData.slice(0);
    cloned.unshift({
      id: Date.now().toString(),
      created_date: new Date().toISOString(),
      title: '',
      body: ''
    });

    setIdeasData(cloned);
  };

  const handleUpdate = (values: EnumIdeaItem) => {
    const index = ideasData.findIndex(({ id }) => id === values.id);

    if (index > -1) {
      const cloned = ideasData.slice(0);
      cloned[index] = Object.assign({}, cloned[index], values);
      setIdeasData(cloned);
    }
  };

  const handleDeleteIdea = (selectedId: string) => {
    const index = ideasData.findIndex(({ id }) => id === selectedId);

    if (index > -1) {
      const cloned = ideasData.slice(0);
      cloned.splice(index, 1);
      setIdeasData(cloned);
    }
  };

  const renderAddNewItemButton = () => {
    return (
      <li key="addBtn">
        <button
          className={styles.addButton}
          onClick={handleAddIdea}
          title="Add a new idea"
          data-testid="add-button"
        >
          <span className={styles.addButtonIcon} />
        </button>
      </li>
    );
  };

  const renderListItems = () => {
    const listItems = ideasData.map(({ id, title, body, created_date }, i) => {
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
