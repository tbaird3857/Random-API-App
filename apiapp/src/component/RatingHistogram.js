import React, { Component } from "react";

class RatingHistogram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ratings: [], 
            selectedRating: 0,
        };
    }

    componentDidMount() {
        // Simulate fetching existing ratings from a server
        this.fetchRatingsFromServer();
    }

    fetchRatingsFromServer = () => {
        // Simulate fetching existing ratings from a server
        const mockRatings = [3, 4, 5, 3, 2, 4, 5, 4, 3];
        this.setState({ ratings: mockRatings });
    };

    handleRatingClick = (rating) => {
        // Simulate sending a new rating to the server 
        this.sendRatingToServer(rating);

        
        this.setState((prevState) => ({
            ratings: [...prevState.ratings, rating],
            selectedRating: rating,
        }));
    };

    sendRatingToServer = (rating) => {
        // Simulate sending a new rating to the server
        console.log(`Sending rating ${rating} to the server...`);
    };

    render() {
        const { ratings, selectedRating } = this.state;

        
        const ratingCounts = [0, 0, 0, 0, 0];
        ratings.forEach((rating) => {
            ratingCounts[rating - 1]++;
        });

        return (
            <div>
                <h3>Rate this website:</h3>
                <div>
                    
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                            key={rating}
                            onClick={() => this.handleRatingClick(rating)}
                            className={selectedRating === rating ? "selected" : ""}
                        >
                            {rating} star
                        </button>
                    ))}
                </div>

                
                <h3>Rating Histogram</h3>
                <div>
                    {ratingCounts.map((count, index) => (
                        <div key={index}>
                            {index + 1} star: {count} votes
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default RatingHistogram;
