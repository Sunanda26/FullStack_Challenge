import React, { Component } from "react";
import Search from "./search";
import List from "./list";
import moment from "moment";
import { connect } from "react-redux";
import { getList } from "../../store/actions/dashboard";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vlog: "",
      searchValue: "",
    };
  }

  async componentDidMount() {
    const response = await this.props.getList();
    console.log(response, "sldjfsd");
  }

  openvlog = (label) => () => {
    const { vlog } = this.state;
    if (!!vlog && vlog === label) {
      this.setState({
        vlog: "",
      });
    } else {
      this.setState({
        vlog: label,
      });
    }
  };
  async gosearch(event) {
    console.log(event.target.value, "sdlkjsfdld");
    if (!!event.target.value) {
      this.setState({
        searchValue: event.target.value,
      });
    } else {
      this.setState({
        searchValue: "",
      });
      await this.props.getList();
    }
  }
  searchBooks = async () => {
    const { searchValue } = this.state;
    if (!!searchValue) {
      const resposne = await this.props.getList({ q: searchValue });
    } else {
      await this.props.getList();
    }
  };

  render() {
    const { vlog, searchValue } = this.state;
    return (
      <div className="dashboard">
        <div className="header">
          <div className="logo">
            <img src="/images/books_logo.jpeg" style={{ height: 45 }} />
            <div className="logo-text">Search Books</div>
          </div>
          <div className="time-zone">
            <img src="/images/date_n_time.png" style={{ height: 25 }} />
            <div>{moment(new Date()).format("DD MMM YYYY hh:mm")}</div>
          </div>
        </div>

        <div className="find-your-books">
          <Search
            onChange={(event) => this.gosearch(event)}
            value={this.state.searchValue}
            onClick={this.searchBooks}
          />
        </div>
        <div className="table-header">
          <div className="fir">Title</div>
          <div className="sec">Authors</div>
          <div className="thi">Categories</div>
          <div className="fou">Published Date</div>
          <div className="fiv">Actions</div>
        </div>

        <div className="Table">
          <div className="table-body">
            {this.props.totalList.map((ele, index) => (
              <div
                style={{
                  margin: "0px 2px",
                  background:
                    index % 2 === 0 && vlog === ele.title ? "#effff5" : "white",
                  borderBottom:
                    vlog === ele.title ? `1px solid rgba(211,211,211,0.3)` : 0,
                  borderLeft:
                    vlog === ele.title ? " 1px solid rgba(211,211,211,0.3)" : 0,
                  borderRight:
                    vlog === ele.title ? "1px solid rgba(211,211,211,0.3)" : 0,
                }}
              >
                <div
                  className="table-row"
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "#effff5" : "white",
                  }}
                >
                  <div className="fir">{ele.title}</div>
                  <div className="sec">{ele.authors.join(", ")}</div>
                  <div className="thi">
                    {!!ele.categories && ele.categories.length > 0
                      ? ele.categories.join(", ")
                      : "-NA-"}
                  </div>
                  <div className="fou">{ele.publishedDate}</div>
                  <div className="fiv" onClick={this.openvlog(ele.title)}>
                    <img
                      src={
                        vlog === ele.title
                          ? "/images/up.png"
                          : "/images/down.png"
                      }
                      style={{ height: 10 }}
                    />
                  </div>
                </div>
                {vlog === ele.title && (
                  <div
                    className="expansion-panel"
                    style={{ display: !!vlog ? "block" : "none" }}
                  >
                    <div style={{ display: "flex" }}>
                      <div>
                        <img
                          src={
                            !!ele.coverImage
                              ? ele.coverImage
                              : "/images/exmple.jpeg"
                          }
                          style={{ height: 150 }}
                        />
                      </div>
                      <div
                        style={{
                          flexGrow: 1,
                          flexBasis: 0,
                          margin: "0px 10px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 13,
                            fontFamily: "fantasy",
                          }}
                        >
                          {ele.description}
                        </div>
                        <div className="more">
                          Average Rating :
                          <span>
                            {ele.averageRating}
                            <img
                              src="/images/star.png"
                              style={{ height: 12, marginLeft: 7 }}
                            />
                          </span>
                        </div>
                        <div className="more">
                          Publishers :<span>{ele.publisher}</span>
                        </div>
                      </div>
                    </div>

                    <div className="more preview">
                      Preview Link :
                      <a target="_blank" href={ele.previewLink}>
                        {ele.previewLink}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="Table-card">
          {this.props.totalList.map((ele, index) => (
            <TableCard
              title={ele.title}
              author={ele.authors.join(", ")}
              category={
                !!ele.categories && ele.categories.length > 0
                  ? ele.categories.join(", ")
                  : "-NA-"
              }
              publisher={ele.publisher}
              date={ele.publishedDate}
              previewLink={ele.previewLink}
              description={ele.description}
            />
          ))}
        </div>
      </div>
    );
  }
}

export class TableCard extends Component {
  render() {
    const {
      author,
      title,
      category,
      date,
      publisher,
      description,
      previewLink,
    } = this.props;

    return (
      <div
        style={{
          background: "white",
          border: "1px solid  rgba(211,211,211,0.5)",
          margin: "10px 0px",
        }}
      >
        <div
          style={{
            background: "#effff5",
            display: "flex",
            alignItems: "center",
            marginLeft: 10,
            minHeight: 40,
            borderBottom: "1px solid rgba(211,211,211,0.3)",
          }}
        >
          <div style={{ fontSize: 13 ,fontWeight:500}}>{title}</div>
        </div>

        <div style={{ display: "flex", margin: 10 }}>
          <img
            src={"/images/exmple.jpeg"}
            style={{ height: 100, marginRight: 10 }}
          />
          <div
            style={{
              fontSize: 13,
              fontFamily: "fantasy",
            }}
          >
            {!!description
              ? description.length > 140
                ? `${description.slice(0, 150) + "..."}`
                : description
              : "NA"}
          </div>
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <div style={{ flexGrow: 1, flexBasis: 0 }}>
            <div className="commonFont">Authors</div>
            <div className="commonFontValue">{author}</div>
          </div>
          <div style={{ flexGrow: 1, flexBasis: 0 }}>
            <div className="commonFont">Category</div>
            <div className="commonFontValue">{category}</div>
          </div>
        </div>

        <div style={{ display: "flex", margin: 10 }}>
          <div style={{ flexGrow: 1, flexBasis: 0 }}>
            <div className="commonFont">Published Date</div>
            <div className="commonFontValue">{date}</div>
          </div>
          <div style={{ flexGrow: 1, flexBasis: 0 }}>
            <div className="commonFont">publisher</div>
            <div className="commonFontValue">{publisher}</div>
          </div>
        </div>

        <div
          style={{
            background: "#effff5",
            textAlign: "center",
            padding: "3px 0px",
          }}
        >
          <a
            target="_blank"
            style={{ fontSize: 12, textDecoration: "none", color: "black" }}
            href={previewLink}
          >
            Preview Link
          </a>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ DashboardReducer }) => {
    const { totalList } = DashboardReducer;
    return {
      totalList,
    };
  },
  { getList }
)(Dashboard);
