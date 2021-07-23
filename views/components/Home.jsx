import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            loading: true,
            search: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        this.setState({
            search: e.target.value
        })
    }

    componentDidMount() {
        fetch('/movielist').
            then(res => res.json()).
            then(({ movies }) => this.setState({ movies })).
            catch(err => console.log(err));
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <h1>
                        Streamer-cito
                    </h1>
                    <input type="text" id="search" onChange={this.handleSearch} placeholder="search for a video..." />
                </header>
                <div id="container">
                    <div class="movie-list" id="">
                        <a href="<%=movie%>"><img src="/images/<%=movie%>.jpg" alt="<%=movie%>" />
                            <p>

                            </p>
                        </a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;