# Node pagination

### `/message/listing`

* **limit** - maximum number of messages. Required
* **offset** - offset from first message in results. Required
* since_id - message id. Optional
* till_id - message id. Optional
 
### `/message/create`

* **author** - author of message. Required
* **text** - message text. Required

* { } - all messages

* { limit: 2, offset: 1 } - Two messages starting from second.

* { since_id: b500f4df-db19-4bc8-8913-6af25c228b0c } - all messages since anchor (NOTE: anchor message not included)

* { till_id: 311c7064-80c5-4473-894d-b0ebebe5ef28 } - all messages till anchor (NOTE: anchor message not included)

* { since_id: b500f4df-db19-4bc8-8913-6af25c228b0c, till_id: 311c7064-80c5-4473-894d-b0ebebe5ef28 } - all messages between anchors (NOTE: anchors messages not included)