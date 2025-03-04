import { Rank } from "../models/Card";
import { Hand } from "../models/Hand";

export enum HandRank {
    RoyalFlush = 10,
    StraightFlush = 9,
    FourOfAKind = 8,
    FullHouse = 7,
    Flush = 6,
    Straight = 5,
    ThreeOfAKind = 4,
    TwoPair = 3,
    OnePair = 2,
    HighCard = 1,
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

    static compareHands(hand1: Hand, hand2: Hand): Hand | null {
        const rank1 = this.evaluate(hand1);
        const rank2 = this.evaluate(hand2);

        if (rank1 > rank2) {
            return hand1;
        } else if (rank2 > rank1) {
            return hand2;
        } else {
            return this.breakTie(hand1, hand2);
        }
    }

    static breakTie(hand1: Hand, hand2: Hand): Hand | null {
        const sortedHand1 = hand1.cards.sort((a, b) => this.getRankValue(b.rank) - this.getRankValue(a.rank));
        const sortedHand2 = hand2.cards.sort((a, b) => this.getRankValue(b.rank) - this.getRankValue(a.rank));

        for (let i = 0; i < sortedHand1.length; i++) {
            const card1 = sortedHand1[i];
            const card2 = sortedHand2[i];
            if (this.getRankValue(card1.rank) > this.getRankValue(card2.rank)) {
                return hand1;
            } else if (this.getRankValue(card2.rank) > this.getRankValue(card1.rank)) {
                return hand2;
            }
        }

        return null;
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