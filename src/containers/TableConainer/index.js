import React, { Component } from "react";
import SearchText from "../../components/SearchText";
import { Icon, Menu, Table } from "semantic-ui-react";
import "./styles.css";

export class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      searchText: "",
      currentPage: 1,
      listPerPage: 5,
      allPage: null
    };
  }

  componentDidMount() {
    const API = "https://jsonplaceholder.typicode.com/users";
    fetch(API)
      .then(res => res.json())
      .then(data => this.setState({ datas: data }))
      .catch(err => console.log(err));
  }

  handleChangeText = e => {
    this.setState({ searchText: e.target.value });
  };

  handleSorting = () => {
    const { datas } = this.state;
    datas.sort((a, b) => a - b).reverse();
    this.setState({ datas });
  };

  handlePagination = e => {
    this.setState({ currentPage: Number(e.target.id) });
  };

  render() {
    const { datas, searchText, currentPage, listPerPage } = this.state;
    const dataLists = datas.filter(data => {
      return data.name.toLowerCase().indexOf(searchText) !== -1;
    });
    const indexOfLastList = currentPage * listPerPage;
    const indexOfFirstList = indexOfLastList - listPerPage;
    const currentList = dataLists.slice(indexOfFirstList, indexOfLastList);
    const pageNumber = [];
    for (let i = 1; i <=  Math.ceil(datas.length / listPerPage); i++) {
      pageNumber.push(i);
    }
    const renderPageNumber = pageNumber.map((number) => {
      return (
        <Menu.Item key={number} id={number} onClick={this.handlePagination}>
          {number}
        </Menu.Item>
      );
    });
    return (
      <React.Fragment>
        <div className="container">
          <div className="example-table">
            <SearchText
              type="search"
              onChange={this.handleChangeText}
              placeholder="Search"
              className="search-box"
            />
            <Table celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    ID <Icon name="sort" onClick={this.handleSorting} />
                  </Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Phone</Table.HeaderCell>
                  <Table.HeaderCell>Website</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {currentList.map((data, index) => (
                  <Table.Row key={index} className="row">
                    <Table.Cell>{data.id}</Table.Cell>
                    <Table.Cell>{data.name}</Table.Cell>
                    <Table.Cell>{data.email}</Table.Cell>
                    <Table.Cell>{data.phone}</Table.Cell>
                    <Table.Cell>{data.website}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Menu pagination>
                {renderPageNumber}
            </Menu>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TableContainer;
