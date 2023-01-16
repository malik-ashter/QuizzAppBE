const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', (req, res) => {
    User.exists({mobile : req.body.mobile}, function (err, doc) {
        if (err){
            res.status(400).send({message: err})
        }else{
            if(doc) {
                updateUser(req.body)
                .then((user)=> {
                    res.status(200).json({userID: user._id});
                })
                .catch((err)=> {
                    res.status(400).send({message: err})
                });
            } else {
                saveUser(req.body)
                .then((user)=> {
                    res.status(200).json({userID: user._id});
                })
                .catch((err)=> {
                    res.status(400).send({message: err})
                });
            }
        }
    });
});

const userSchema = new mongoose.Schema({
    userName : String,
    gender : String,
    age : Number,
    mobile : String,
    country : String,
    quizzLanguage : String
});

const User = mongoose.model('User', userSchema);

async function saveUser(userToSave) {
    const user =  new User(userToSave);
    const result = await user.save();
    return result;
}

async function updateUser(user) {
    const result = await User.findOneAndUpdate({mobile: user.mobile } , user);
    return result;
}

module.exports = router;