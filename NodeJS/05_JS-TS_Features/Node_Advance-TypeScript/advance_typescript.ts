// * Advanced Type System Features
//Typescript's type system provides powerful tools for creating robust and maintainable Node.js applications.

//* 1. Union and Intersection Types
// Union type
function formatId(id: string | number) {
    return `ID: ${id}`;
}

//Intersection type
type User2 = { name: string } & { id: number };

//* 2. Type Gaurds
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
    return 'swim' in pet;
}

//* 3. Advanced Generics
//Generic function with constrains
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

//Generic interface with default type
interface PaginatedResponse<T = any> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

// Using generic types with async/await in Node.js
async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json();
}

//* 4. Mappped and Conditional Types
//Mapped types
type ReadonlyUser = {
    readonly [K in keyof User2]: User2[K];
};

// Conditional types
type NonNullableUser = NonNullable<User2 | null | undefined>;

// Type interface with conditional types
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
function getUser() {
    return { id: 1, name: 'Alice' } as const;
}
type UserRetunsType = GetReturnType<typeof getUser>;

//* 5. Type Inference and Type Guards
const name1 = 'Alice';
const age = 30;
const active = true;

// Type inference with arrays
const numbers2 = [1, 2, 3];
const mixed = [1, 'two', true];

function getUser1() {
    return { id: 1, name: 'Alice' };
}

const user11 = getUser1();
console.log(user11.name);
