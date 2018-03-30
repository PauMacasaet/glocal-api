const bcrypt = require('bcrypt-nodejs');

module.exports = [
    {
        fullName: 'Aaron Hernandez',
        username: 'userA',
        email: 'a@mail.com',
        password: bcrypt.hashSync('ahumanbeing'),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'System Engineer'
    },
    {
        fullName: 'Mei Wang',
        username: 'mei',
        email: 'mei@mail.com',
        password: bcrypt.hashSync('meiwang'),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'Account Manager'
    },
    {
        fullName: 'Mara Mondragon',
        username: 'mara',
        email: 'mara@mail.com',
        password: bcrypt.hashSync('mondragon'),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'Account Manager'
    },
    {
        fullName: 'Jefferson Ong',
        username: 'JOng',
        email: 'jong@mail.com',
        password: bcrypt.hashSync('jefferson'),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'System Engineer'
    },
    {
        fullName: 'Jeffrey Jonas',
        username: 'jjonas',
        email: 'jonas@mail.com',
        password: bcrypt.hashSync('jjonas'),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'System Engineer'
    }
];