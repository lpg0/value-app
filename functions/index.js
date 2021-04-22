//index.js

const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const {
    getAllValues,
    postOneValue,
    getOneValue,
    deleteValue,
    editValue
} = require('./APIs/values')

const {
    loginUser,
    signUpUser,
    uploadProfilePhoto, 
    getUserDetail,
    updateUserDetails
} = require('./APIs/users')

app.get('/values', auth, getAllValues);
app.post('/value', auth, postOneValue);
app.get('/value', auth, getOneValue);
app.delete('/value/:valueId', auth, deleteValue);
app.put('/value/:valueId', auth, editValue);
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);

exports.api = functions.https.onRequest(app);