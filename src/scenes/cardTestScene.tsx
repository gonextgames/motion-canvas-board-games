
import { createRef, waitFor, waitUntil } from "@motion-canvas/core";
import { Img, Circle, Grid, Txt, Rect, Node, CubicBezier} from "@motion-canvas/2d/lib/components"
import {Card} from "../components/card"
import { makeScene2D } from "@motion-canvas/2d";
import front from "../images/front.jpg"
import back from "../images/back.jpg"

export default makeScene2D(function* (view) {
  var mainRef = createRef<Rect>()
  yield view.add(<Rect ref={mainRef} width={"100%"} height={"100%"} fill={"#141414"}/>)

  var thing = <Card frontSrc={front} backSrc={back} width={825/4} height={1125/4} rotation={0} initialFlipState={0}/>
  yield mainRef().add(thing)
  var card = thing as Card
  for(var i = 0 ; i < 10; i++) {
    yield* card.flip(1)
    yield* waitFor(1/8)
  }
  yield* waitFor(5);
});
