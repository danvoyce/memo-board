import React, { Component } from "react";
import styles from "./IdeasList.module.css";

interface Props {
  title: string;
  body: string;
  id: string;
  created_date: string;
  shouldAutoFocus: boolean;
  onUpdate: ((values: EnumIdeaItem) => void);
  onDeleteIdea: (() => void);
}

enum KeyTypes {
  title,
  body,
  id,
  created_date
}

class IdeaItem extends Component<Props, EnumIdeaItem> {
  constructor(props: Props) {
    super(props);

    const { title, body, id, created_date } = props;

    this.state = {
      title,
      body,
      id,
      created_date
    };
  }

  handleUpdateState(e: any, key: string) {
    const { value } = e.target;

    const newState = Object.assign({}, this.state, { [key]: value });

    this.setState(newState);

    /* Note:
      TypeScript was freaking out when attempting to do the below `this.setState({...})`.
      I believe it doesn't like that we can set the key to an unknown string,
      which then could potentially break the `EnumIdeaItem` interface.
      So I resorted to the above, although this still allows an unknown string as the key 🤨
    */

    // this.setState({
    //   [key]: value
    // });
  }

  saveValues = () => {
    const { title, body, id, created_date } = this.state;
    this.props.onUpdate({ title, body, id, created_date });
  };

  render() {
    const { title, body } = this.state;
    return (
      <fieldset>
        <textarea
          className={styles.titleField}
          onChange={e => this.handleUpdateState(e, "title")}
          onBlur={this.saveValues}
          value={title}
          data-test="title-field"
          autoFocus={this.props.shouldAutoFocus}
          placeholder="Add title..."
        />
        <textarea
          className={styles.bodyField}
          onChange={e => this.handleUpdateState(e, "body")}
          onBlur={this.saveValues}
          value={body}
          maxLength={140}
          data-test="body-field"
          placeholder="Add body..."
        />
        <button
          title="Delete idea"
          className={styles.deleteButton}
          onClick={this.props.onDeleteIdea}
          data-test="delete-button"
        />
      </fieldset>
    );
  }
}

export default IdeaItem;
