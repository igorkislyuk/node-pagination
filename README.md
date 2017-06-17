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

#### Разбиение логики приложения и устранение `require('../routes/message/create')`

С целью повышения читаемости кода возможно заменить обычное подключение файлов `*.js`
на использование модулей `npm`. Располагать все локальные модули следует в папке `local`.

#### Пример с ипользованием `routes`

Тогда код такого вида

```js
// routes
const defaultRoute = require('./routes/default.js');

const listingRoute = require('./routes/message/listing.js');

const createRoute = require('./routes/message/create');

...

app.get('/', defaultRoute);
app.post('/message/create', createRoute);
app.post('/message/listing', listingRoute);
```

изменится на такой

```js
// routes
const routes = require('local_routes');

app.get('/', routes.default);
app.post('/message/create', routes.message.create);
app.post('/message/listing', routes.message.listing);
```

**Достоинства**:
- повышение читабельности
- устранение проблемы большого пути до файла
- устранение проблемы неверного пути до файла в случае его перемещения

**Недостатки**:
- необходимо уделять время на конфигурирование локальных файлов `package.json`
- при удалении возможности в `npm` локальной установки модулей данный способ становится недействительным

Возможные [**альтернативы**](https://gist.github.com/branneman/8048520)
