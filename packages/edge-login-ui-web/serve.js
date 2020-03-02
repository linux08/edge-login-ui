const express = require('express')
const app = express()
const port = 11234

app.use('/edge-iframe', express.static('assets'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))