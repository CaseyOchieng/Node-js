const HttpError = require('../models/http-error');
const uuid = require('uuid');

const DUMMY_PLACES = [{
    id: 'p1',
    name: 'jeff',
    email: 'jeff',
    password: 'testpassword',
}];



const getUsers = (res, req, next) => {
    res.json({ message: 'it works', users: DUMMY_PLACES });
};

const signup = (req, res, next) => {
    const { email, password, name } = req.body;

    const createdUser = {
        id: req.body.id || uuid.v4(),
        email,
        password,
        name
    };
    DUMMY_PLACES.push(createdUser);
    res.status(201).json({ message: 'User created!' });
};

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_PLACES.find(u => u.email === email && u.password === password
    );
    if (!identifiedUser) {
        throw new HttpError('Could not identify user', 401);
    }
    res.json({ message: 'it works', loggedin });
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;