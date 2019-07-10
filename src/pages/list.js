import React, {  Component } from 'react'
import PropTypes from 'prop-types'

export default class Lists extends Component {
    render() {
        console.log(this)
        return (
            <ul>
                {this.props.posts.map((post, i) =>
                    <li key={i}>{post.title}</li>
                )}
            </ul>
        )
    }
}

Lists.propTypes = {
    posts: PropTypes.array.isRequired
};