const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({msg: 'connected'});
});

const PORT = process.env.PORT || 5000;

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));
app.use('/test/',require('./routes/test'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));