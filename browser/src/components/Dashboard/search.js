import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <div>
        <div className="find-your-books-text">Find your books here</div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginTop: 10,
          }}
          className="search"
        >
          <input
            placeholder="Search by Title.."
            onChange={this.props.onChange}
            value={this.props.value}
            onKeyDown={this.props.onKeyDown}
          />
          <button onClick={this.props.onClick}>Search</button>
        </div>
      </div>
    );
  }
}
