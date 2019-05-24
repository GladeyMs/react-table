import React, { Component } from 'react'
import { Icon, Table } from 'semantic-ui-react'

export class DataTable extends Component {
  render() {
    const { sortBy, datas, columnToSort, direction, header } = this.props
    return (
      <React.Fragment>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              {header.map((x, i) => (
                <Table.HeaderCell key={i} onClick={() => sortBy(x.prop)}>
                  <span>{x.name}</span>{' '}
                  {columnToSort === x.prop ? (
                    direction === 'asc' ? (
                      <Icon name='sort up' />
                    ) : (
                      <Icon name='sort down' />
                    )
                  ) : <Icon name='sort' />}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {datas.map((data, index) => (
              <Table.Row key={index}>
                <Table.Cell>{data.id}</Table.Cell>
                <Table.Cell>{data.name}</Table.Cell>
                <Table.Cell>{data.email}</Table.Cell>
                <Table.Cell>{data.phone}</Table.Cell>
                <Table.Cell>{data.website}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </React.Fragment>
    )
  }
}

export default DataTable
