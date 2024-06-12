const express = require('express');
const userApi = require('./routes/user');
const taskApi = require('./routes/task');
const financeApi = require('./routes/finance');
const roleApi = require('./routes/role');
const permissionApi = require('./routes/permission');
const agentApi = require('./routes/agent');
const cors = require('cors');
require('./config/connect');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('uploads'));


app.use('/author' , userApi);
app.use('/task' , taskApi);
app.use('/finance' , financeApi);
app.use('/role' , roleApi);
app.use('/permission' , permissionApi);
app.use('/agents' , agentApi);

app.use('/getimage' , express.static('./uploads'));


app.listen(3000, ()=>{
    console.log('server works');
})