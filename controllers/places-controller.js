const HttpError = require('../models/http-error');
const uuid = require('uuid');
let DUMMY_PLACES = [{
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world',
    location: {
        lat: 40.7484405,
        lng: -73.9878584
    },
    creator: 'u1',
    address: '20 W 34th St, New York, NY 10001',

}];

/* This code defines a function called getPlacebyId that takes in a request, response, and next function. It retrieves the placeId from the request parameters and then searches for a place with the matching id in the DUMMY_PLACES array. If the place is not found, it throws an HTTP error with a 404 status code. If the place is found, it logs a message and sends a JSON response with the message "it works" and the details of the found place. */

const getPlacebyId = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    });

    if (!place) {
        throw new HttpError('Could not find a places for the provided id.', 404);
    }
    console.log('Get Places Request');
    res.json({ message: 'it works', place: place });
}

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId
    });
    if (!places || places.length === 0) {
        return next(new HttpError('Could not find a places for the provided id.', 404)
        );
    }
    console.log('Get users Request');
    res.json({ places });
};

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: req.body.id || uuid.v4(),
        title,
        description,
        location: coordinates,
        address,
        creator,
    }
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({ place: createdPlace });
};


const updatePlace = (req, res, next) => {
    const { title, description } = req.body;
    const placeId = req.params.pid;
    const updatedPlace = {
        ...DUMMY_PLACES.find(p => p.id === placeId),
        title,
        description
    };
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    DUMMY_PLACES.push(updatedPlace);
    res.status(200).json({ place: updatedPlace });
};


/* This code defines a function to delete a place from a list of dummy places. It checks if the place exists, and if it does, it removes it from the list and returns a success message.*/
const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new HttpError('Could not find a place for the provided id.', 404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({ message: 'Place deleted!' });
};

exports.getPlacebyId = getPlacebyId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.deletePlace = deletePlace;
exports.updatePlace = updatePlace;
