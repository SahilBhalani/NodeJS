// *  TypeScript Basics

// ? 1. Basic Types
// Premitive types
let isDone: boolean = false;
let count: number = 10;
let myName: string = 'TypeScript';

// Arrays
let numbers : number[] = [1,2,3];
let names: Array<string> = ['Alice', 'Bob'];

// Tuples
let user: [string, number] = ['Alice', 25];

//Enums 
enum Color {Red, Green, Blue}
let color: Color = Color.Green;

// ? 2. Interface and Types
// Interface 
interface User{
    id: number;
    name: string;
    email?: string; // Optional property
}

//Type alias 
type Point = {
    x: number;
    y: number;
};

// Using the interaface
function printUser(user: User) {
    console.log(`User: ${user.name}`);
}