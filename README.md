# js-mysql-react-todolist

###Инструкция по установке
установить необходимые пакеты
```shell
npm install
bower install
```

поднять бд
```sql
CREATE DATABASE IF NOT EXISTS todolist;

CREATE TABLE IF NOT EXISTS todolist.todos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    done BIT
);
```

сконфигурировать connectionstring в `config/config.js`

###Запуск
`node`

###Known issues

- апдейт записей происходит только после упешного апдейта на сервере
- при апдейте запись не блокируется, т.о. может одновременно сработать несколько апдейтов
на одну запись
- нет оповещения клиентов об изменениях в бд
- при редактировании нажатие на enter генерирует два изменения ( скорее всего +1 на blur+change )

_totally based on React [TodoMVC Example](http://todomvc.com/examples/react/)_

## React TodoMVC Example

> React is a JavaScript library for creating user interfaces. Its core principles are declarative code, efficiency, and flexibility. Simply specify what your component looks like and React will keep it up-to-date when the underlying data changes.

> _[React - facebook.github.io/react](http://facebook.github.io/react)_


## Learning React

The [React getting started documentation](http://facebook.github.io/react/docs/getting-started.html) is a great way to get started.

Here are some links you may find helpful:

* [Documentation](http://facebook.github.io/react/docs/getting-started.html)
* [API Reference](http://facebook.github.io/react/docs/reference.html)
* [Blog](http://facebook.github.io/react/blog/)
* [React on GitHub](https://github.com/facebook/react)
* [Support](http://facebook.github.io/react/support.html)

Articles and guides from the community:

* [Philosophy](http://www.quora.com/Pete-Hunt/Posts/React-Under-the-Hood)
* [How is Facebook's React JavaScript library](http://www.quora.com/React-JS-Library/How-is-Facebooks-React-JavaScript-library)
* [React: Under the hood](http://www.quora.com/Pete-Hunt/Posts/React-Under-the-Hood)

Get help from other React users:

* [React on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
* [Mailing list on Google Groups](https://groups.google.com/forum/#!forum/reactjs)
*
_If you have other helpful links to share, or find any of the links above no longer work, please [let us know](https://github.com/tastejs/todomvc/issues)._


## Running

The app is built with [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) and compiled at runtime for a lighter and more fun code reading experience. As stated in the link, JSX is not mandatory.

To run the app, spin up an HTTP server (e.g. `python -m SimpleHTTPServer`) and visit http://localhost/.../myexample/.
