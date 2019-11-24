import React, { useState } from 'react';
import styles from './IdeasList.module.css';

interface IdeaItemProps {
  title: string;
  body: string;
  id: string;
  created_date: string;
  shouldAutoFocus: boolean;
  onUpdate: (values: EnumIdeaItem) => void;
  onDeleteIdea: () => void;
}

const IdeaItem = ({
  title,
  body,
  id,
  created_date,
  shouldAutoFocus,
  onUpdate,
  onDeleteIdea
}: IdeaItemProps) => {
  const [titleState, setTitleState] = useState(title);
  const [bodyState, setBodyState] = useState(body);

  const saveValues = () => {
    onUpdate({
      title: titleState,
      body: bodyState,
      id,
      created_date
    });
  };

  return (
    <fieldset>
      <textarea
        className={styles.titleField}
        onChange={e => setTitleState(e.target.value)}
        onBlur={saveValues}
        value={titleState}
        data-test="title-field"
        autoFocus={shouldAutoFocus}
        placeholder="Add title..."
      />
      <textarea
        className={styles.bodyField}
        onChange={e => setBodyState(e.target.value)}
        onBlur={saveValues}
        value={bodyState}
        maxLength={140}
        data-test="body-field"
        placeholder="Add body..."
      />
      <button
        title="Delete idea"
        className={styles.deleteButton}
        onClick={onDeleteIdea}
        data-testid="delete-button"
      />
    </fieldset>
  );
};

export default IdeaItem;
