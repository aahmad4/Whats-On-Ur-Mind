# Whats On Ur Mind

A SaaS (Software as a Service) app to allow individuals to host their own shareable Q&A platforms. Made with Python, Flask, React.js, PostgreSQL, and Stripe.

## Summary

- [Getting Started](#getting-started)
- [Built With](#built-with)
- [Contributing](#contributing)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Setup

A step by step series of examples that tell you how to get a development env running.

#### Clone

```sh
$ git clone https://github.com/aahmad4/Whats-On-Ur-Mind
```

#### Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install the required packages for the React app.

For the Python modules use [pip](https://pypi.org/project/pip/) or [pipenv](https://pypi.org/project/pipenv/) to install the required dependencies.

React app:

```sh
$ cd client
$ npm install
```

or

```sh
$ cd client
$ yarn install
```

Python Flask server:

```sh
$ pip install -r requirements.txt
```

or

```sh
$ pipenv install
```

#### Usage

In order to run this project locally, you must start the server and client dev servers in separate terminals.

To start the React app:

```bash
$ cd client
$ npm start
```

To start the Python Flask server, run the following in the root directory.

If you have pipenv:

```bash
$ pipenv run python app.py
```

Otherwise:

```bash
$ export FLASK_APP=app.py
$ flask run
```

or

```bash
$ python app.py
```

#### Implementation

For development, in the root directory create a `.env` file and place the following variables in there.

```env
POSTGRES_DATABASE_URI =
JWT_SECRET_KEY =
FLASK_ENV =
STRIPE_SECRET_KEY =
```

In the client directory create another `.env` file and place the following variables in there.

```env
REACT_APP_STRIPE_PUBLIC_KEY =
REACT_APP_STRIPE_PRICE_ID =
```

## Built With

- [Python](https://www.python.org/) - Back-end programming language
- [Flask](https://flask.palletsprojects.com/) - Micro web framework
- [PostgreSQL](https://www.postgresql.org/) - Powerful relational database management system
- [Stripe](https://stripe.com/) - Online payment processing API
- [React.js](https://reactjs.org/) - Front-end web library
- [Chakra UI](https://chakra-ui.com/) - Simple component library
- [Heroku](https://www.heroku.com/) - Cloud application platform

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
