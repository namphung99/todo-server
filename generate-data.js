const faker = require('faker');
const fs = require('fs');

faker.locale = 'vi';

const randomUserList = (n) => {
    const userList = [];
    Array.from(new Array(n)).forEach(() => {
        const user = {
            id: faker.datatype.uuid(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
            avt: faker.internet.avatar(),
            displayName: faker.name.lastName(),
            gender: faker.name.gender(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        userList.push(user);
    })
    return userList;
}

const randomTodos = (userList , numberOfTodos) => {
    const todos = [];

    for(const user of userList){
        Array.from(new Array(numberOfTodos)).forEach(() => {
            const todo = {
                id: faker.datatype.uuid(),
                title: faker.name.title(),
                status: faker.datatype.number(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                idUser: user.id,
            }

            todos.push(todo);
        })
    }

    return todos;
}
// Random data
const userList = randomUserList(2);
const todos = randomTodos(userList, 6);


// IFFE
(() => {
    // prepare db object
    const db = {
        user: userList,
        todos: todos
    };

    // write db object to db.json
    fs.writeFile('db.json',JSON.stringify(db), () => {
        console.log('generate data successfully!!!');
    })
})()