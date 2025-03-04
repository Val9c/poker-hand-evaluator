import * as readline from 'readline';
import { Card, Rank, Suit } from "./src/models/Card";
import { Hand } from "./src/models/Hand";
import { PokerHandEvaluator } from "./src/services/PokerHandEvaluator";

function createHandFromInput(input: string, usedCards: Set<string>): Hand {
    const cards = input.split(" ").map(cardInput => {
        const [rankStr, suitStr] = cardInput.split("_");

        const rankMapping: { [key: string]: Rank } = {
            "As": Rank.Ace,
            "Roi": Rank.King,
            "Dame": Rank.Queen,
            "Valet": Rank.Jack,
            "10": Rank.Ten,
            "9": Rank.Nine,
            "8": Rank.Eight,
            "7": Rank.Seven,
            "6": Rank.Six,
            "5": Rank.Five,
            "4": Rank.Four,
            "3": Rank.Three,
            "2": Rank.Two
        };

        const suitMapping: { [key: string]: Suit } = {
            "Coeur": Suit.Hearts,
            "Carreau": Suit.Diamonds,
            "Trèfle": Suit.Clubs,
            "Pique": Suit.Spades
        };

        const rank = rankMapping[rankStr];
        const suit = suitMapping[suitStr];

        if (rank === undefined || suit === undefined) {
            throw new Error(`Carte invalide : ${cardInput}`);
        }

        const card = new Card(rank, suit);

        const cardKey = `${rankStr}_${suitStr}`;
        if (usedCards.has(cardKey)) {
            throw new Error(`La carte ${cardKey} a déjà été utilisée dans une autre main.`);
        }

        usedCards.add(cardKey);

        return card;
    });

    return new Hand(cards);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptForHand(handNumber: number, usedCards: Set<string>): Promise<Hand> {
    return new Promise((resolve, reject) => {
        rl.question(`Entrez les cartes pour la main ${handNumber} (format : As_Coeur Roi_Coeur Dame_Coeur Valet_Coeur 10_Coeur) : `, (input) => {
            try {
                const hand = createHandFromInput(input, usedCards);
                resolve(hand);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error("Une erreur inconnue est survenue.");
                }
                reject(error);
            }
        });
    });
}

async function main() {
    const usedCards = new Set<string>();

    try {
        const hand1 = await promptForHand(1, usedCards);
        const hand2 = await promptForHand(2, usedCards);

        const winner = PokerHandEvaluator.compareHands(hand1, hand2);
        console.log(winner ? "La meilleure main est : " + JSON.stringify(winner) : "Il y a égalité.");
    } catch (error) {
        console.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
        rl.close();
    }
}

main();