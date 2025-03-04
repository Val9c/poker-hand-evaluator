import { Card, Rank, Suit } from "../models/Card";
import { Hand } from "../models/Hand";
import { PokerHandEvaluator, HandRank } from "./PokerHandEvaluator";

describe("PokerHandEvaluator", () => {
    test("Reconnaît une Quinte Flush Royale", () => {
        const hand = new Hand([
            new Card(Rank.Ace, Suit.Hearts),
            new Card(Rank.King, Suit.Hearts),
            new Card(Rank.Queen, Suit.Hearts),
            new Card(Rank.Jack, Suit.Hearts),
            new Card(Rank.Ten, Suit.Hearts),
        ]);
        expect(PokerHandEvaluator.evaluate(hand)).toBe(HandRank.RoyalFlush);
    });

    test("Reconnaît un Carré", () => {
        const hand = new Hand([
            new Card(Rank.Seven, Suit.Hearts),
            new Card(Rank.Seven, Suit.Diamonds),
            new Card(Rank.Seven, Suit.Spades),
            new Card(Rank.Seven, Suit.Clubs),
            new Card(Rank.Nine, Suit.Hearts),
        ]);
        expect(PokerHandEvaluator.evaluate(hand)).toBe(HandRank.FourOfAKind);
    });

    test("Reconnaît un Full", () => {
        const hand = new Hand([
            new Card(Rank.Ten, Suit.Hearts),
            new Card(Rank.Ten, Suit.Diamonds),
            new Card(Rank.Ten, Suit.Spades),
            new Card(Rank.Four, Suit.Clubs),
            new Card(Rank.Four, Suit.Hearts),
        ]);
        expect(PokerHandEvaluator.evaluate(hand)).toBe(HandRank.FullHouse);
    });

    test("Reconnaît une Quinte", () => {
        const hand = new Hand([
            new Card(Rank.Nine, Suit.Hearts),
            new Card(Rank.Eight, Suit.Clubs),
            new Card(Rank.Seven, Suit.Spades),
            new Card(Rank.Six, Suit.Diamonds),
            new Card(Rank.Five, Suit.Hearts),
        ]);
        expect(PokerHandEvaluator.evaluate(hand)).toBe(HandRank.Straight);
    });

    test("Reconnaît une Carte Haute", () => {
        const hand = new Hand([
            new Card(Rank.Ace, Suit.Clubs),
            new Card(Rank.Ten, Suit.Diamonds),
            new Card(Rank.Seven, Suit.Hearts),
            new Card(Rank.Six, Suit.Clubs),
            new Card(Rank.Two, Suit.Spades),
        ]);
        expect(PokerHandEvaluator.evaluate(hand)).toBe(HandRank.HighCard);
    });

    test("Compare les mains et renvoie la meilleure main", () => {
        const hand1 = new Hand([
            new Card(Rank.Ace, Suit.Hearts),
            new Card(Rank.King, Suit.Hearts),
            new Card(Rank.Queen, Suit.Hearts),
            new Card(Rank.Jack, Suit.Hearts),
            new Card(Rank.Ten, Suit.Hearts),
        ]);
        const hand2 = new Hand([
            new Card(Rank.King, Suit.Spades),
            new Card(Rank.Queen, Suit.Spades),
            new Card(Rank.Jack, Suit.Spades),
            new Card(Rank.Ten, Suit.Spades),
            new Card(Rank.Nine, Suit.Spades),
        ]);

        expect(PokerHandEvaluator.compareHands(hand1, hand2)).toBe(hand1);
    });

    test("Compare les mains et renvoie la meilleure main en cas d'égalité", () => {
        const hand1 = new Hand([
            new Card(Rank.Ace, Suit.Hearts),
            new Card(Rank.King, Suit.Hearts),
            new Card(Rank.Queen, Suit.Hearts),
            new Card(Rank.Jack, Suit.Hearts),
            new Card(Rank.Ten, Suit.Hearts),
        ]);
        const hand2 = new Hand([
            new Card(Rank.Ace, Suit.Spades),
            new Card(Rank.King, Suit.Spades),
            new Card(Rank.Queen, Suit.Spades),
            new Card(Rank.Jack, Suit.Spades),
            new Card(Rank.Ten, Suit.Spades),
        ]);

        expect(PokerHandEvaluator.compareHands(hand1, hand2)).toBeNull();
    });

    test("Effectue un départage entre deux mains", () => {
        const hand1 = new Hand([
            new Card(Rank.Ace, Suit.Hearts),
            new Card(Rank.King, Suit.Hearts),
            new Card(Rank.Queen, Suit.Hearts),
            new Card(Rank.Jack, Suit.Hearts),
            new Card(Rank.Ten, Suit.Hearts),
        ]);
        const hand2 = new Hand([
            new Card(Rank.Ace, Suit.Spades),
            new Card(Rank.King, Suit.Spades),
            new Card(Rank.Queen, Suit.Spades),
            new Card(Rank.Jack, Suit.Spades),
            new Card(Rank.Nine, Suit.Spades),
        ]);

        expect(PokerHandEvaluator.compareHands(hand1, hand2)).toBe(hand1);
    });

    test("Effectue un départage en cas d'égalité de cartes les plus élevées", () => {
        const hand1 = new Hand([
            new Card(Rank.Ace, Suit.Hearts),
            new Card(Rank.King, Suit.Hearts),
            new Card(Rank.Queen, Suit.Hearts),
            new Card(Rank.Jack, Suit.Hearts),
            new Card(Rank.Ten, Suit.Hearts),
        ]);
        const hand2 = new Hand([
            new Card(Rank.Ace, Suit.Spades),
            new Card(Rank.King, Suit.Spades),
            new Card(Rank.Queen, Suit.Spades),
            new Card(Rank.Jack, Suit.Spades),
            new Card(Rank.Ten, Suit.Spades),
        ]);

        expect(PokerHandEvaluator.compareHands(hand1, hand2)).toBeNull();
    });

});