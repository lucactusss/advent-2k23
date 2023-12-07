import { Injectable } from '@nestjs/common'
import { allHands } from './inputs/day7-input'

// USAGE :
// await get(Day7Service).solvePart1()

export interface Hand {
  hand: string
  bid: number
  cards?: { [key: string]: number }
  type?: string
}

export interface ClassedHand {
  highCard: Hand[]
  pair: Hand[]
  doublePair: Hand[]
  threeOfAKind: Hand[]
  fullHouse: Hand[]
  fourOfAKind: Hand[]
  fiveOfAKind: Hand[]
}

@Injectable()
export class Day7Service {
  async solvePart1(): Promise<number> {
    let result = 0
    const handsStrength: ClassedHand = {
      highCard: [],
      pair: [],
      doublePair: [],
      threeOfAKind: [],
      fullHouse: [],
      fourOfAKind: [],
      fiveOfAKind: [],
    }
    const orderedHands = []
    for (const hand of allHands) {
      const cards = this.processCards(hand)
      const strength = this.getHandStrength(cards)
      hand.type = strength
      handsStrength[strength].push(hand)
    }
    const orderedHighCard = handsStrength.highCard.sort((a, b) =>
      this.getBestHighCard(a, b)
    )
    orderedHands.push(...orderedHighCard)
    const orderedPair = handsStrength.pair.sort((a, b) =>
      this.getBestHighCard(a, b)
    )
    orderedHands.push(...orderedPair)
    const orderedDoublePair = handsStrength.doublePair.sort((a, b) =>
      this.getBestHighCard(a, b)
    )
    orderedHands.push(...orderedDoublePair)
    const orderedThreeOfAKind = handsStrength.threeOfAKind.sort((a, b) =>
      this.getBestHighCard(a, b)
    )
    orderedHands.push(...orderedThreeOfAKind)
    const orderedFullHouse = handsStrength.fullHouse.sort((a, b) =>
      this.getBestHighCard(a, b)
    )
    orderedHands.push(...orderedFullHouse)
    const orderedFourOfAKind = handsStrength.fourOfAKind.sort((a, b) =>
      this.getBestHighCard(a, b)
    )
    orderedHands.push(...orderedFourOfAKind)
    const orderedFiveOfAKind = handsStrength.fiveOfAKind.sort((a, b) =>
      this.getBestHighCard(a, b)
    )
    orderedHands.push(...orderedFiveOfAKind)
    // console.log(JSON.stringify(orderedHands))
    for (let i = 0; i < orderedHands.length; i++) {
      result += orderedHands[i].bid * (i + 1)
      console.log(
        'hand',
        orderedHands[i].hand,
        'type',
        orderedHands[i].type,
        'bid',
        orderedHands[i].bid,
        'rank',
        i + 1,
        'score',
        result
      )
    }
    return result
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private processCards(hand: Hand): { [key: string]: number } {
    const cards: { [key: string]: number } = {}
    const allCards = hand.hand.split('')
    for (const card of allCards) {
      if (!cards[card]) {
        cards[card] = 1
      } else {
        cards[card]++
      }
    }
    hand.cards = cards
    return cards
  }

  getBestHighCard(hand1: Hand, hand2: Hand, index = 0): number {
    if (index === 5) {
      return 0
    }
    // Check the highest card
    const hand1HighestCardValue = this.getCardValue(hand1.hand.split('')[index])
    const hand2HighestCardValue = this.getCardValue(hand2.hand.split('')[index])
    if (hand1HighestCardValue === hand2HighestCardValue) {
      return this.getBestHighCard(hand1, hand2, index + 1)
    } else if (hand1HighestCardValue > hand2HighestCardValue) {
      return 1
    } else {
      return -1
    }
  }

  private getHandStrength(cards: { [key: string]: number }): string {
    // Check if there is a pair
    const fiveOfAKind = Object.values(cards).filter((card) => card === 5)
    if (fiveOfAKind.length > 0) {
      return 'fiveOfAKind'
    }
    const fourOfAKind = Object.values(cards).filter((card) => card === 4)
    if (fourOfAKind.length > 0) {
      return 'fourOfAKind'
    }
    const fullHouseP1 = Object.values(cards).filter((card) => card === 3)
    const fullHouseP2 = Object.values(cards).filter((card) => card === 2)
    if (fullHouseP1.length > 0 && fullHouseP2.length > 0) {
      return 'fullHouse'
    }
    const threeOfAKind = Object.values(cards).filter((card) => card === 3)
    if (threeOfAKind.length > 0) {
      return 'threeOfAKind'
    }
    const pairs = Object.values(cards).filter((card) => card === 2)
    if (pairs.length === 2) {
      return 'doublePair'
    } else if (pairs.length === 1) {
      return 'pair'
    }
    return 'highCard'
  }

  getCardValue(card: string): number {
    switch (card) {
      case '2':
        return 1
      case '3':
        return 2
      case '4':
        return 3
      case '5':
        return 4
      case '6':
        return 5
      case '7':
        return 6
      case '8':
        return 7
      case '9':
        return 8
      case 'T':
        return 9
      case 'J':
        return 10
      case 'Q':
        return 11
      case 'K':
        return 12
      case 'A':
        return 13
    }
  }
}
