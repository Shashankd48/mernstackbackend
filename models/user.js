const mongoose = require('mongoose');
const crypto = require('crypto');

// if its not working try old above method on importing
const uuidv1 = require('uuid/v1');

var userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
  },
  lastname:{
    type: String,
    maxlength: 32,
    trim: true
  },
  email: {
      type: String,
      trim: true,
      required: true,
      unique: true
  },
  userinfo: {
      type: String,
      trim: true
  },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    rol: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
},{ timestamps: true});

userSchema.virtual('password')
    .set((password)=>{
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(()=>{
        return this._password;
    })


userSchema.methods = {

    authenticate: function(plainPassowrd){
        return this.securePassword(plainPassowrd) === this.encry_password;
    },
    securePassword: function(plainPassowrd){
        if(!plainPassowrd) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainPassowrd)
                .digest('hex');
        } catch (error) {
            return "";   
        }
    }
}

module.exports = mongoose.model('User',userSchema)