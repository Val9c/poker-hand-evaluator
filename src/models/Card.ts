export enum Suit {
    Hearts = "Coeur",
    Diamonds = "Carreau",
    Clubs = "Trèfle",
    Spades = "Pique",
}

export enum Rank {
    Two = "2",
    Three = "3",
    Four = "4",
    Five = "5",
    Six = "6",
    Seven = "7",
    Eight = "8",
    Nine = "9",
    Ten = "10",
    Jack = "Valet",
    Queen = "Dame",
    King = "Roi",
    Ace = "As",
}

export class Card {
    constructor(public rank: Rank, public suit: Suit) { }

    toString(): string {
        return `${this.rank} de ${this.suit}`;
    }
}