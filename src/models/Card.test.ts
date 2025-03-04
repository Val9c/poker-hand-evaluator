import { Card, Suit, Rank } from "./Card";

describe("Card", () => {
    test("doit créer une carte avec une valeur et une couleur", () => {
        const card = new Card(Rank.Ace, Suit.Hearts);
        expect(card.rank).toBe(Rank.Ace);
        expect(card.suit).toBe(Suit.Hearts);
        expect(card.toString()).toBe("As de Coeur");
    });
});