import { Card } from "./Card";

export class Hand {
    constructor(public cards: Card[]) {
        if (cards.length !== 5) {
            throw new Error("Une main doit contenir exactement 5 cartes.");
        }
    }

    toString(): string {
        return this.cards.map(card => card.toString()).join(" | ");
    }
}