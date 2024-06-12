const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: String, // e.g., "create_task", "delete_user"
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],

});

module.exports = mongoose.model('Permission', permissionSchema);
