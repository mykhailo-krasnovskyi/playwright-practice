// let firstName: string | number = 'Hannah';
// firstName = 'Alex';
// firstName = 10;

// let names: (string | number)[] = ['String', 'String2'];

// names.push('John', 'Sally', 10, 20);

// let normalObject = {
//     name: 'Daniel',
//     age: 40,
//     street: 'Harvard Str.'
// }

// type User = {
//     name: string,
//     age: number,
//     street?: number | string
// }

// let user1: User = {
//     name: 'Alex',
//     age: 55,
//     street: 'Main Str.'
// }

// interface Car {
//     model: string,
//     brand: string,
//     mileage: number
// }

// type Status = 'active' | 'inactive' | 'banned';

// let userStatus: Status = 'active';

// function calculateSum(num1: number, num2: number): number {
//     return num1 + num2;
// }

// console.log(calculateSum(100, 200));

// enum Role {
//     Admin = 'adminRole',
//     User = 'userRole'
// }

// function login(role: Role) {

// }

// login(Role.User)

class Car {
    public readonly name: string;
    protected readonly price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    private fillPetrol(liters: number): void {
        console.log('Filled!');
    }
}