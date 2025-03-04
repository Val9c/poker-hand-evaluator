import { Card, Rank, Suit } from "../models/Card";
import { Hand } from "../models/Hand";

export enum HandRank {
    HighCard = "Carte Haute",
    OnePair = "Paire",
    TwoPair = "Deux Paires",
    ThreeOfAKind = "Brelan",
    Straight = "Quinte",
    Flush = "Couleur",
    FullHouse = "Full",
    FourOfAKind = "Carré",
    StraightFlush = "Quinte Flush",
    RoyalFlush = "Quinte Flush Royale",
}

export class PokerHandEvaluator {
    static evaluate(hand: Hand): HandRank {
        const ranks = hand.cards.map(card => card.rank);
        const suits = hand.cards.map(card => card.suit);

        const isFlush = new Set(suits).size === 1;
        const sortedRanks = ranks
            .map(rank => this.getRankValue(rank))
            .sort((a, b) => a - b);

        const isStraight = sortedRanks.every((rank, index, arr) =>
            index === 0 || rank === arr[index - 1] + 1
        );

        if (isFlush && isStraight && sortedRanks.includes(this.getRankValue(Rank.Ace))) {
            return HandRank.RoyalFlush;
        }
        if (isFlush && isStraight) {
            return HandRank.StraightFlush;
        }

        const rankCounts = this.countRanks(ranks);
        const countValues = Object.values(rankCounts);

        if (countValues.includes(4)) return HandRank.FourOfAKind;
        if (countValues.includes(3) && countValues.includes(2)) return HandRank.FullHouse;
        if (isFlush) return HandRank.Flush;
        if (isStraight) return HandRank.Straight;
        if (countValues.includes(3)) return HandRank.ThreeOfAKind;
        if (countValues.filter(count => count === 2).length === 2) return HandRank.TwoPair;
        if (countValues.includes(2)) return HandRank.OnePair;

        return HandRank.HighCard;
    }

    private static getRankValue(rank: Rank): number {
        const rankOrder: { [key in Rank]: number } = {
            "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
            "Valet": 11, "Dame": 12, "Roi": 13, "As": 14
        };
        return rankOrder[rank];
    }

    private static countRanks(ranks: Rank[]): Record<Rank, number> {
        return ranks.reduce((acc, rank) => {
            acc[rank] = (acc[rank] || 0) + 1;
            return acc;
        }, {} as Record<Rank, number>);
    }
}