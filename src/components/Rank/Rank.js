import React, { Component } from "react";

class Rank extends Component {
  constructor() {
    super();
    this.state = {
      emoji: ""
    };
  }
  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.entries === this.props.entries &&
      prevProps.name === this.props.name
    ) {
      return null;
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = entries => {
    fetch(
      `https://uaqqbero80.execute-api.us-east-1.amazonaws.com/production/rank?rank=${entries}`
    )
      .then(response => response.json())
      .then(data => this.setState({ emoji: data.input }))
      .catch(console.log);
  };
  render() {
    const { name, entries } = this.props;
    const { emoji } = this.state;
    return (
      <div>
        <div className="white f3">
          {`${name}, your current entry count is...`}
        </div>
        <div className="white f1">{entries}</div>
        <div className="white f2">{`Rank badge: ${emoji}`}</div>
      </div>
    );
  }
}

export default Rank;
