const { app } = require('../index');
const { getAllBooks, getBookById } = require('../controllers');

const http = require('http');
const request = require('supertest');

let server;

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
}));

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('api tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully retrieves all book records.', async () => {
    const mockedBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];

    getAllBooks.mockReturnValue(mockedBooks);
    const res = await request(server).get('/books');
    expect(res.status).toBe(200);
    expect(res.body.books).toEqual(mockedBooks);
    expect(res.body.books.length).toBe(3);
  });

  it('should retrieves a specific book record by ID', async () => {
    const mockedBook = {
      bookId: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
    };

    getBookById.mockReturnValue(mockedBook);

    const res = await request(server).get('/books/details/1');
    expect(res.status).toBe(200);
    expect(res.body.book).toEqual(mockedBook);
  });
});

describe('function test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all books', () => {
    const mockedBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];
    getAllBooks.mockReturnValue(mockedBooks);

    const res = getAllBooks();
    expect(res).toEqual(mockedBooks);
  });
});
