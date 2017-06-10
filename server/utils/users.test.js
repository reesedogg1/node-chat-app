const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Jill',
            room: 'Node Course'
        }]
    });

    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Maurice',
            room: 'GoT Fans'
        };
        var resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var user = users.removeUser('3');

        expect(user.id).toEqual('3');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var user = users.removeUser('7');

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '1';
        var user = users.getUser('1');

        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
        var userId = '5';
        var user = users.getUser('5');

        expect(user).toNotExist();
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Jill']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });
});
