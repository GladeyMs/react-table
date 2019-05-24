import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import orderBy from 'lodash/orderBy'
import DataTable from '../../components/DataTable'
import SearchText from '../../components/SearchText'
import './styles.css'

const invertDirection = {
  asc: 'desc',
  desc: 'asc'
}
export class TableContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      searchText: '',
      currentPage: 1,
      listPerPage: 5,
      columnToSort: '',
      direction: 'asc'
    }
  }

  componentDidMount() {
    const API = 'https://jsonplaceholder.typicode.com/users'
    fetch(API)
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.log(err))
  }

  handleChangeText = e => {
    this.setState({ searchText: e.target.value })
  }

  handlePagination = e => {
    this.setState({ currentPage: Number(e.target.id) })
  }

  handleSorting = key => {
    const { direction, data, columnToSort } = this.state
    this.setState({
      columnToSort: key,
      direction: columnToSort === key ? invertDirection[direction] : 'asc'
    })
    // this.setState({
    //   data: data.sort((a, b) =>
    //     direction[key] === 'asc' ? a[key] - b[key] : b[key] - a[key]
    //   ),
    //   direction: {
    //     [key]: direction[key] === 'asc' ? 'desc' : 'asc'
    //   }
    // })
  }

  render() {
    const {
      data,
      searchText,
      currentPage,
      listPerPage,
      columnToSort,
      direction
    } = this.state
    const dataLists = data.filter(data => {
      return data.name.toLowerCase().indexOf(searchText) !== -1
    })
    const indexOfLastList = currentPage * listPerPage
    const indexOfFirstList = indexOfLastList - listPerPage
    const currentList = dataLists.slice(indexOfFirstList, indexOfLastList)
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(data.length / listPerPage); i++) {
      pageNumber.push(i)
    }
    const renderPageNumber = pageNumber.map(number => {
      return (
        <Menu.Item key={number} id={number} onClick={this.handlePagination}>
          {number}
        </Menu.Item>
      )
    })
    return (
      <div className='container'>
        <div className='example-table'>
          <SearchText
            type='search'
            onChange={this.handleChangeText}
            placeholder='Search'
            className='search-box'
          />
          <DataTable
            sortBy={this.handleSorting}
            columnToSort={columnToSort}
            direction={direction}
            datas={orderBy(currentList, columnToSort, direction)}
            header={[
              {
                name: 'ID',
                prop: 'id'
              },
              {
                name: 'Name',
                prop: 'name'
              },
              {
                name: 'Email',
                prop: 'email'
              },
              {
                name: 'Phone',
                prop: 'phone'
              },
              {
                name: 'Website',
                prop: 'website'
              }
            ]}
          />
          <Menu pagination>{renderPageNumber}</Menu>
        </div>
      </div>
    )
  }
}

export default TableContainer
