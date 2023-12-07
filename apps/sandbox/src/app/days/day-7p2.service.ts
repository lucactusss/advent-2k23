import { Injectable } from '@nestjs/common'
import { allHands } from './inputs/day7-input'

// USAGE :
// await get(Day7P2Service).solvePart2()

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
export class Day7P2Service {
  async solvePart2(): Promise<number> {
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
      // const cards = this.processCards(hand)
      const strength = this.getHandStrength(hand.hand.split(''))
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

  private getHandStrength(hand: string[]): string {
    const cards = new Set(hand)
    if (cards.has('J')) return this.scoreJokerHand(hand)
    let maxCount = 0
    switch (cards.size) {
      case 5:
        return 'highCard'
      case 4:
        return 'pair'
      case 3:
        for (const card of cards) {
          const cardCount = hand.filter((hc) => hc === card)
          if (cardCount.length > maxCount) maxCount = cardCount.length
        }
        return maxCount === 2 ? 'doublePair' : 'threeOfAKind'
      case 2:
        for (const card of cards) {
          const cardCount = hand.filter((hc) => hc === card)
          if (cardCount.length > maxCount) maxCount = cardCount.length
        }
        return maxCount === 3 ? 'fullHouse' : 'fourOfAKind'
      case 1:
        return 'fiveOfAKind'
    }
  }

  scoreJokerHand(hand) {
    const jokerCount = hand.filter((hc) => hc === 'J').length
    const cards = new Set(hand)
    let maxCount = 0
    switch (jokerCount) {
      case 5:
      case 4:
        return 'fiveOfAKind'
      case 3:
        return cards.size === 3 ? 'fourOfAKind' : 'fiveOfAKind'
      case 2:
        if (cards.size === 4) return 'threeOfAKind'
        if (cards.size === 3) return 'fourOfAKind'
        if (cards.size === 2) return 'fiveOfAKind'
        break
      case 1:
        if (cards.size === 5) return 'pair'
        if (cards.size === 4) return 'threeOfAKind'
        if (cards.size === 3) {
          for (const card of cards) {
            const cardCount = hand.filter((hc) => hc === card)
            if (cardCount.length > maxCount) maxCount = cardCount.length
          }
          return maxCount === 2 ? 'fullHouse' : 'fourOfAKind'
        }
        if (cards.size === 2) {
          return 'fiveOfAKind'
        }
        break
    }
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
        return 0
      case 'Q':
        return 11
      case 'K':
        return 12
      case 'A':
        return 13
    }
  }
}
