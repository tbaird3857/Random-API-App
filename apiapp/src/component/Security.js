import React, { Component } from "react";

class Security extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: "",
            isSecure: null,
            isLoading: false,
            error: null
        };
    }

    handleChange = (event) => {
        this.setState({ link: event.target.value });
    };

    checkSecurity = () => {
        const { link } = this.state;

        if (!link) {
            return; 
        }

        this.setState({ isLoading: true });

        fetch(`https://networkcalc.com/api/security/certificate/${link}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                
                const isSecure = data.meta && data.meta.protocol === "https:";

                this.setState({
                    isSecure,
                    isLoading: false,
                    error: null
                });
            })
            .catch((error) => {
                this.setState({
                    isSecure: false,
                    isLoading: false,
                    error: error.message
                });
            });
    };

    render() {
        const { link, isSecure, isLoading, error } = this.state;

        return (
            <div>
                <h2>Link Security Checker</h2>
                <input
                    type="text"
                    placeholder="Enter a link..."
                    value={link}
                    onChange={this.handleChange}
                />
                <button onClick={this.checkSecurity} disabled={isLoading}>
                    {isLoading ? "Checking..." : "Is it secure?"}
                </button>
                {error && <p>Error: {error}</p>}
                {isSecure !== null && !isLoading && (
                    <p>
                        {isSecure
                            ? "Yes, it's secure!"
                            : "No, it's not secure."}
                    </p>
                )}
            </div>
        );
    }
}

export default Security;
