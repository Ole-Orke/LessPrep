import React, { Component } from 'react';

class ContentTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const contentStyle = {
      height: "80vh",
      flex: 1,
      borderLeft: "2px solid #e0e0e0"
    }
    return (
      <div style={contentStyle}>
      </div>
    )
  }
}

export default ContentTable;
