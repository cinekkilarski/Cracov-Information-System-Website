import React, { Component } from 'react';
import '../styles/Comments.css'
import { Card } from 'react-bootstrap'

class Comments extends Component {
    state = {
        comments: []
    };

    handleLoadComments = () => {
        fetch(`http://localhost:8080/api/comments/${this.props.currentPlace}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    comments: res.data,
                })
            })
            .catch(error => this.setState({ error }));
    }


    componentDidMount() {
        this.handleLoadComments();
    }


    render() {
        const comments = this.state.comments.map(comment => {
            let date = new Date(comment.updatedAt).toLocaleString()
            let user = `${comment.first_name} ${comment.last_name}`
            return (
            <Card id="item" key={comment._id}>
                <Card.Header>
                    ${user}
                    <div id="commentDate">{date}</div>
                </Card.Header>
                <Card.Body>
                    {comment.text}
                </Card.Body>
            </Card>
            );
        });

        return (
            <div className="scrollList" id="styleScroll">
                {comments}
                {this.state.comments.length <= 0 && (
                        <div id='noCommentsYet'>
                            No comments to display. Add the first one!
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Comments;