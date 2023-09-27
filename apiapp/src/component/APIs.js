// APIs.js

import React, { Component } from 'react';

class APIs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      apis: [],
      generatedLink: '',
    };
  }

  fetchRandomAPI = () => {
    fetch('https://api.publicapis.org/random')
      .then((res) => res.json())
      .then(
        (data) => {
          const generatedLink = data.entries[0].Link;
          this.setState({
            isLoaded: true,
            apis: data.entries,
            generatedLink,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  saveToMongoDB = () => {
    const { generatedLink } = this.state;

    // Send the generated link to the server to save in MongoDB
    fetch('http://localhost:3000/api/save-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        API: 'Generated API',
        Description: 'Generated Description',
        Link: generatedLink,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error saving to MongoDB:', error);
      });
  };

  componentDidMount() {
    this.fetchRandomAPI();
  }

  render() {
    const { error, isLoaded, apis, generatedLink } = this.state;
    return (
      <div>
        <button onClick={this.fetchRandomAPI}>Generate Random API</button>
        {error && <div>Error: {error.message}</div>}
        {!isLoaded ? (
          <div>Loading...</div>
        ) : (
          <div>
            {apis.map((api) => (
              <div key={api.API}>
                <p>API: {api.API}</p>
                <p>Description: {api.Description}</p>
                <p>
                  Link: <a href={api.Link} target="_blank" rel="noopener noreferrer">{api.Link}</a>
                </p>
              </div>
            ))}
            <button onClick={this.saveToMongoDB}>Save Link to MongoDB</button>
          </div>
        )}
      </div>
    );
  }
}

export default APIs;
