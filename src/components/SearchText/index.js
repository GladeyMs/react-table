import React, { Component } from 'react'
import { SearchInput } from './styled'

export class SearchText extends Component {
    render() {
        const { onChange, placeholder, type, className } = this.props
        return (
            <React.Fragment>
                <SearchInput type={type} onChange={onChange} placeholder={placeholder} className={className} />
            </React.Fragment>
        )
    }
}

export default SearchText
