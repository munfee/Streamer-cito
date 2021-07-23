import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: true,
            search: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        this.setState({
            search: e.target.value.toLowerCase()
        })
    }

    componentDidMount() {
        fetch('/movielist').
            then(res => res.json()).
            then(({ movies }) => this.setState({
                movies,
                loading: false
            })).
            catch(err => console.log(err));
    }

    render() {
        const { movies, loading, search } = this.state;
        const load = loading && <div id="loading"></div>;
        let movieList = movies.filter(movie => movie.toLowerCase().includes(search));
        movieList = movieList.length === 0 ? 'No results!' : movieList.map(movie => (
            <div class="movie-list" id={movie} key={movie}>
                <Link to={`/${movie}`}>
                    <img src={`/images/${movie}.jpg`} alt={`${movie} poster`} />
                    <p>
                        {movie}
                    </p>
                </Link>
            </div>
        ));
        return (
            <React.Fragment>
                <header>
                    <h1>
                        Streamer-cito
                    </h1>
                    <input type="text" id="search" onChange={this.handleSearch} placeholder="search for a video..." />
                </header>
                <div id="container">
                    {load || movieList}
                </div>
            </React.Fragment>
        );
    }
}

export default Home;