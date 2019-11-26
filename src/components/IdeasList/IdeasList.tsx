import React, { useState, useEffect, useMemo } from 'react';
import IdeaItem from './IdeaItem';
import { IdeaItemInterface } from './IdeaItemInterface';
import ideasDataFixture from '../../api/ideas.fixture';
import { getRandomColor } from '../../utils';
import classes from './IdeasList.module.css';

export type SortTypes = 'title' | 'created_date';

const IdeasList = () => {
  const [ideasData, setIdeasData] = useState<Array<IdeaItemInterface>>([]);
  const [sortKey, setSortKey] = useState<SortTypes>('title');
  const [dataFetched, setDataFetched] = useState(false);

  const sortedIdeasData = useMemo(() => {
    return Array.from(ideasData).sort((a, b) => {
      const v1 = a[sortKey].toLowerCase();
      const v2 = b[sortKey].toLowerCase();

      if (v1 < v2) {
        return -1;
      }

      if (v1 > v2) {
        return 1;
      }

      return 0;
    });
  }, [sortKey, ideasData]);

  useEffect(() => {
    if (!dataFetched) {
      // Simulating the UX of fetching data...
      // Could be replaced with a fetch or thunk action call if using redux
      setTimeout(() => {
        setIdeasData(ideasDataFixture);
        setDataFetched(true);
      }, 500);
    }
  }, [dataFetched]);

  const handleAddIdea = () => {
    const cloned = ideasData.slice(0);
    cloned.unshift({
      id: Date.now().toString(),
      created_date: new Date().toISOString(),
      color: getRandomColor(),
      title: '',
      body: ''
    });

    setIdeasData(cloned);
  };

  const handleUpdate = (values: IdeaItemInterface) => {
    const index = ideasData.findIndex(
      ({ id }: IdeaItemInterface) => id === values.id
    );

    if (index > -1) {
      const cloned = ideasData.slice(0);
      cloned[index] = Object.assign({}, cloned[index], values);
      setIdeasData(cloned);
    }
  };

  const handleDeleteIdea = (selectedId: string) => {
    const index = ideasData.findIndex(
      ({ id }: IdeaItemInterface) => id === selectedId
    );

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
          className={classes.addButton}
          onClick={handleAddIdea}
          title="Add a new idea"
          data-testid="add-button"
        >
          <span className={classes.addButtonIcon} />
        </button>
      </li>
    );
  };

  const renderListItems = () => {
    const listItems = sortedIdeasData.map(
      ({ id, title, body, created_date, color }, i: Number) => {
        const shouldAutoFocus = !title && i === 0;
        return (
          <li
            key={id}
            data-testid="idea-item"
            style={{ backgroundColor: color }}
          >
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
      }
    );

    listItems.unshift(renderAddNewItemButton());

    return listItems;
  };

  return (
    <>
      <div className={classes.sortDropDown}>
        <label htmlFor="sort">Sort by: </label>
        <select
          value={sortKey}
          id="sort"
          onChange={e => {
            const value: any = e.target.value;
            setSortKey(value);
          }}
          data-testid="sort-options"
        >
          <option value="title">Title</option>
          <option value="created_date">Created date</option>
        </select>
      </div>
      <ol className={classes.list}>{renderListItems()}</ol>
    </>
  );
};

export default IdeasList;
