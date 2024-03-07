# Fillout Form Responses API Server

This Node.js server application is designed to interact with Fillout.com's API to fetch and filter form responses. It provides a simple yet powerful endpoint that allows clients to retrieve form submissions with specific filters, such as filtering responses by date, number, or text criteria. Utilizing Express.js for the server framework and Axios for HTTP requests, this server is an efficient way to work with Fillout form responses, supporting dynamic filtering based on the client's needs.

## Features

- Fetches form responses from Fillout.com's API.
- Supports dynamic filtering of responses based on conditions like equals, does not equal, greater than, and less than.
- Handles different response types including dates, numbers, and text.
- Uses environment variables for configuration, ensuring security and flexibility.
- Implements pagination through offset and limit query parameters, making it suitable for handling large sets of data.

## Getting Started

### Prerequisites

- Node.js (v12.x or higher recommended)
- npm (v6.x or higher recommended)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/fillout-api-server.git
   ```
2. Navigate into the project directory:
   ```sh
   cd fillout-api-server
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Set up your environment variables:
   - Open `.env` and replace `your_api_key_here` with your actual Fillout.com API key.

### Running the Server

To start the server, run the following command in the project root directory:
```sh
npm run start:dev
```
The server will start running on the specified port, defaulting to `3000` if not specified in the `.env` file.

### Using the API

To fetch and filter form responses, send a GET request to:
```
http://localhost:3000/{formId}/filteredResponses?offset=0&limit=150&filters=[your_filters_here]
```
Replace `{formId}` with your actual form ID from Fillout.com, and `[your_filters_here]` with a JSON stringified array of filter objects according to your filtering needs.

### Example:

```sh
curl  -X GET 'https://fillout-api-server.onrender.com/cLZojxk94ous/filteredResponses'
```

```sh
curl  -X GET \
  'https://fillout-api-server.onrender.com/cLZojxk94ous/filteredResponses?filters=%5B%7B%22id%22%3A%22bE2Bo4cGUv49cjnqZ4UnkW%22%2C%22condition%22%3A%22equals%22%2C%22value%22%3A%22Johnny%22%7D%5D'
```

```sh
curl  -X GET \
  'https://fillout-api-server.onrender.com/cLZojxk94ous/filteredResponses?filters=%5B%7B%22id%22%3A%22bE2Bo4cGUv49cjnqZ4UnkW%22%2C%22condition%22%3A%22equals%22%2C%22value%22%3A%22Johnny%22%7D%2C%7B%22id%22%3A%22dSRAe3hygqVwTpPK69p5td%22%2C%22condition%22%3A%22greater_than%22%2C%22value%22%3A%222024-02-01%22%7D%5D'
```