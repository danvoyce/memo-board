import React, { Component } from "react";
import styles from "./IdeasList.module.css";

interface state {
  title?: string;
  body?: string;
}

interface props {
  title: string;
  body: string;
  shouldAutoFocus: boolean;
  onUpdate: ((values: state) => void);
  onDeleteIdea: (() => void);
}

class IdeaItem extends Component<props, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: props.title,
      body: props.body
    };
  }

  handleUpdateState(e = { target: { value: "" } }, key: string) {
    const { value } = e.target;

    this.setState({
      [key]: value
    });
  }

  saveValues = () => {
    const { title, body } = this.state;
    this.props.onUpdate({ title, body });
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
