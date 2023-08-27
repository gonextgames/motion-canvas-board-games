
import { Vector2, all, createRef, waitFor, waitUntil } from "@motion-canvas/core";
import { Img, Circle, Grid, Txt, Rect, Node, CubicBezier} from "@motion-canvas/2d/lib/components"
import {Card} from "../components/card"
import { makeScene2D } from "@motion-canvas/2d";
import front from "../images/front.jpg"
import back from "../images/back.jpg"

export default makeScene2D(function* (view) {
  var mainRef = createRef<Rect>()
  yield view.add(<Rect ref={mainRef} width={"100%"} height={"100%"} fill={"#141414"}/>)

  var ref = createRef<Card>()
  yield mainRef().add(<Card ref={ref} frontSrc={front} backSrc={back} width={825/4} height={1125/4} rotation={0} x={0} y={0} initialFlipState={1}/>)
  yield* ref().rotation(90,1)
  yield* ref().flipState(0,1)
  yield* ref().flipState(1,1)

  yield* ref().size(new Vector2(825,1125),1) 
  yield* ref().rotation(0,1)
  yield* ref().flipState(0,1)
  yield* ref().flipState(1,1)

  yield* all(
    yield ref().width(825/4,1),
    yield ref().height(1125/4,1)
  )
  yield* ref().rotation(90,1)
  yield* ref().flipState(0,1)
  yield* ref().flipState(1,1)

  yield* waitFor(1);
});
