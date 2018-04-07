const bcrypt = require('bcryptjs');

module.exports = [
    {
        fullName: 'Sonny Pascasio',
        username: 'sonnyP',
        email: 'sonny@mail.com',
        password: bcrypt.hashSync('sonnyp', 10),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'Director'
    },
    {
        fullName: 'Aaron Hernandez',
        username: 'userA',
        email: 'a@mail.com',
        password: bcrypt.hashSync('ahumanbeing', 10),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'System Engineer'
    },
    {
        fullName: 'Mei Wang',
        username: 'mei',
        email: 'mei@mail.com',
        password: bcrypt.hashSync('meiwang', 10),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'Account Manager'
    },
    {
        fullName: 'Mara Mondragon',
        username: 'mara',
        email: 'mara@mail.com',
        password: bcrypt.hashSync('mondragon', 10),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'Account Manager'
    },
    {
        fullName: 'Jefferson Ong',
        username: 'JOng',
        email: 'jong@mail.com',
        password: bcrypt.hashSync('jefferson', 10),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'System Engineer'
    },
    {
        fullName: 'Jeffrey Jonas',
        username: 'jjonas',
        email: 'jonas@mail.com',
        password: bcrypt.hashSync('jjonas', 10),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'System Engineer'
    },
    {
        fullName: 'Isaiah Solomon',
        username: 'ice',
        email: 'ice@mail.com',
        password: bcrypt.hashSync('isaiah', 10),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'System Engineer'
    },
    {
        fullName: 'John Jenkins',
        username: 'jjenkins',
        email: 'jenkins@mail.com',
        password: bcrypt.hashSync('jenkins', 10),
        contactNumber: '09876543212',
        dateCreated: new Date(),
        position: 'System Engineer'
    }
];