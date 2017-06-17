# Node pagination

### `/message/listing`

* **limit** - maximum number of messages. Number. Required
* **offset** - offset from first message in results. Number. Required
* since_id - message id. UUID. Optional
* till_id - message id. UUID. Optional
 
### `/message/create`

* **author** - author of message. String. Required
* **text** - message text. String. Required

## Problems & Proposals

#### Разбиение логики приложения и устранение `require(../../../../your-module)`

#### Изменение


// const defaultRoute = require('./local/routes/index.js');

// const listingRoute = require('./local/routes/message/listing.js');
// listingRoute.database = database;

// const createRoute = require('./local/routes/message/create');
// createRoute.database = database;