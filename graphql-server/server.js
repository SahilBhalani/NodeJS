//* Create a Basic GraphQL Server
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

//Sample data
const books = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925,
        genre: 'Novel'
    },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: 1960,
        genre: 'Southern Gothic'
    }
]

// Define the schema using GraphQL schema language
const schema = buildSchema(`
    # A book has a title, author, and publication year
    type Book{
        id: ID!
        title: String!
        author: String!
        year: Int
        genre: String
    }

    # The "Query" type is the root of all GraphQL Queries
    type Query{
    # Get all books
    books: [Book!]!
    #Get a specific book by ID
    book(id: ID!) : Book
    # Search books by title or author
    searchBooks(query: String!): [Book!]!
    }
    `); 

//Define resolvers for the schema fields
const root = {
    //Resolve for fetching all books
    books: () => books,

    //Resolver for fetching a single book by ID
    book: ({ id }) => books.find(book => book.id === id),

    //Resolve for searching books
    searchBooks: ({ query }) => {
        const searchTerm = query.toLowerCase();
        return books.filter(
            book => 
                book.title.toLowerCase().includes(searchTerm) || 
                book.author.toLowerCase().includes(searchTerm)
        );
    }
}

//Server setup
const app = express();

// Set up the GraphiQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    //Enable the graphiQl interface for testing
    graphiql: true,
}))

//Start server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
})