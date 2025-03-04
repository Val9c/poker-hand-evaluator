import { Card, Suit, Rank } from "./Card";
import { Hand } from "./Hand";

describe("Hand", () => {
    test("doit créer une main valide avec 5 cartes", () => {
        const hand = new Hand([
            new Card(Rank.Two, Suit.Clubs),
            new Card(Rank.Three, Suit.Diamonds),
            new Card(Rank.Four, Suit.Hearts),
            new Card(Rank.Five, Suit.Spades),
            new Card(Rank.Six, Suit.Clubs),
        ]);

        expect(hand.cards.length).toBe(5);
        expect(hand.toString()).toBe("2 de Trèfle | 3 de Carreau | 4 de Coeur | 5 de Pique | 6 de Trèfle");
    });

    test("doit lever une erreur si la main contient moins ou plus de 5 cartes", () => {
        expect(() => new Hand([])).toThrow("Une main doit contenir exactement 5 cartes.");
        expect(() => new Hand([new Card(Rank.Ace, Suit.Hearts)])).toThrow("Une main doit contenir exactement 5 cartes.");
    });
});