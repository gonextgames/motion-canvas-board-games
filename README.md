
# Motion Canvas Board Game Components

This package helps you create animations about board games.

## Usage

```
npm install --save motion-canvas-board-games
```

```typescript
include {Card} from "motion-canvas-board-games"
...
var thing = <Card frontSrc="frontImageSrc" backSrc="backImageSrc" width={825/4} height={1125/4} rotation={0} initialFlipState={0}/>
yield mainRef().add(thing)

var card = thing as Card
yield* card.flip(1)
```

## Contribution Guide

Thanks for considering contributing! We need more types of board game components like chits, dice, or decks.

### Creating a new kind of component

For each new component you make:

- Create a new file for it
- Create a new scene showing it off
- Add the scene to the project