const mongoose = require('mongoose');

const InvitationCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
});

module.exports = InvitationCode = mongoose.model(
  'invitationCode',
  InvitationCodeSchema
);
