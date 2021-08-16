import React from 'react';
import { Link } from 'react-router-dom';
import Forms from './Forms.jsx';
import Comments from './Comments.jsx';


class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            showError: false
        }
        this.printComments = this.printComments.bind(this);
        this.showError = this.showError.bind(this);
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

    showError(e) { 
        this.setState({
            showError: true
        })
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.printComments();
    }

    render() {

        return (
            <React.Fragment>
                <header>
                    <Link to='/'>
                        Streamer-cito
                    </Link>
                </header>
                <div id='video-box'>
                <video controls onError={this.showError}>
                    <source src={`/${this.props.match.params.movie}/play`} type="video/mp4" />
                    Sorry, your browser does not support HTML videos
                </video>
                {this.state.showError? <div id="video-error">woops</div>: null}
                </div>
                <p id="video-title">{this.props.match.params.movie}</p>
                <Forms match={this.props.match} printComments={this.printComments}>
                    <Comments comments={this.state.comments} />
                </Forms>
            </React.Fragment>
        );
    }
}
export default Movie;
