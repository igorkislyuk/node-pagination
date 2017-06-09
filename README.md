# Node pagination

### `/message/listing`

* **limit** - maximum number of messages. Number. Required
* **offset** - offset from first message in results. Number. Required
* since_id - message id. UUID. Optional
* till_id - message id. UUID. Optional
 
### `/message/create`

* **author** - author of message. String. Required
* **text** - message text. String. Required