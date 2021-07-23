import React from 'react';
import { Link } from 'react-router-dom';
import Forms from './Forms.jsx';
import Comments from './Comments.jsx';


class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
        this.printComments = this.printComments.bind(this);
    }
    printComments() {
        fetch(`${this.props.match.params.movie}/comment`)
            .then(res => res.json())
            .then(({ payload }) => {
                console.log(payload);
                this.setState({ comments: payload });
            })
            .catch(err => console.log(err));

    }
    componentDidMount() {
        this.printComments();
    }

    render() {

        return (
            <React.Fragment>
                <header>
                    <Link to='/'>
                        Streamer-cito
                    </Link>
                    <p>
                        {this.props.match.params.movie}
                    </p>
                </header>
                <video controls>
                    <source src={`/${this.props.match.params.movie}/play`} type="video/mp4" />
                </video>
                <Forms match={this.props.match} printComments={this.printComments}>
                    <Comments comments={this.state.comments} />
                </Forms>
            </React.Fragment>
        );
    }
}
export default Movie;