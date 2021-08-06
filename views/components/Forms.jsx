import React from 'react';

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            message: '',
            commentInput: '',
            usernameInput: ''
        }
        this.fetchUsername = this.fetchUsername.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fetchUsername() {
        fetch('/username')
            .then(res => res.json())
            .then(({ payload }) => {
                console.log(payload);
                this.setState({
                    username: payload,
                })
            })
            .catch(err => console.log(err));
    }

    handleSubmit(e) { // handle submit for both username and comment forms 
        e.preventDefault();
        fetch(e.target.action, {
            method: e.target.dataset.method,
            body: JSON.stringify({ [e.target.id]: this.state[`${e.target.id}Input`] }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(({ payload = null, message }) => {
                console.log(payload, message);
                if (e.target.id === 'username') this.setState({ username: payload });
                if (e.target.id === 'comment') {
                    this.props.printComments();
                    this.setState({ commentInput: '' });
                }
                this.setState({ message })
            })
            .catch(err => console.log(err));
    }

    handleChange(e) { //handle changes for both username and comment forms 
        this.setState({
            [`${e.target.name}Input`]: e.target.value
        })
    }

    componentDidMount() {
        this.fetchUsername();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.username !== this.state.username) this.setState(state => ({
            usernameInput: state.username || ''
        }));
    }

    render() {
        const { username, message, usernameInput, commentInput } = this.state;
        const style = { opacity: (username && 0.5) || 1 };
        return (
            <React.Fragment>
                <form data-method={username ? "DELETE" : "POST"} id="username" onSubmit={this.handleSubmit} action="/username">
                    <label>
                        Username: <input style={style} type="text" disabled={!!username}
                            name="username" onChange={this.handleChange} value={usernameInput} />
                    </label>
                    <button type="submit">{username ? 'Delete' : 'Send'}</button>
                </form>
                {this.props.children}
                <form data-method="POST" id="comment" onSubmit={this.handleSubmit} action={`/${this.props.match.params.movie}/comment`}>
                    <textarea name="comment" onChange={this.handleChange} value={commentInput} ></textarea>
                    <button type="submit">Send Comment</button>
                </form>
                <p id="message">{message}</p>
            </React.Fragment>
        );
    }
}

export default Forms;