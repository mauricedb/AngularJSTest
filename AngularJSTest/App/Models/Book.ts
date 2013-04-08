module App {
    export interface Book {
        id: number;
        title: string;
        author: string;
    }

    export function createBooks() {
        var books: Book[] = [
            { id: 1, title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams" },
            { id: 2, title: "2001: A Space Odyssey", author: "Arthur C. Clarke" },
            { id: 3, title: "The War of the Worlds", author: "H G Wells" },
            { id: 4, title: "Jurassic Park", author: "Michael Crichton" },
            { id: 5, title: "I, Robot", author: "Isaac Asimov" },
        ];

        return books;
    }
}
