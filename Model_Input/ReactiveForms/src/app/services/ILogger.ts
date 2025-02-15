/*
    TypeScript interfaces are purely a compile-time construct, 
    meaning they don't exist at runtime. However, 
    Angular's dependency injection system needs a runtime reference to provide an instance of a class. 
    This is why interfaces cannot be directly used as tokens in the providers array—because they don't exist at runtime.
*/
export abstract class ILogger {
    abstract log(): void;
}