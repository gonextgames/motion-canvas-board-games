import {createRef, Reference, ReferenceReceiver} from '@motion-canvas/core/lib/utils'
import {Img, NodeProps, RectProps} from '@motion-canvas/2d/lib/components'
import {CodeBlock} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components'
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow'
import {Direction, Vector2, Vector2Signal} from '@motion-canvas/core/lib/types'
import { easeInBack, easeInCubic, easeOutBack, easeOutCubic, linear } from '@motion-canvas/core/lib/tweening';

import {createSignal, SignalValue, SimpleSignal} from '@motion-canvas/core/lib/signals';
import { initial, signal } from '@motion-canvas/2d/lib/decorators';


export interface CardProps extends RectProps  {
    frontSrc: SignalValue<string>, 
    backSrc: SignalValue<string>,
    initialFlipState?: SignalValue<number>,
    // ref: ReferenceReceiver<Card>;
}

export class Card extends Rect {
    @signal()
    public declare readonly frontSrc: SimpleSignal<string, this>

    @signal()
    public declare readonly backSrc: SimpleSignal<string, this>

    @initial(1)
    @signal()
    public declare readonly initialFlipState: SimpleSignal<number, this>

    private flipValue: number
    private readonly flipState = createSignal(0)

    private containerRectRef:ReferenceReceiver<Card>;
    private readonly frontImageRef = createRef<Img>();
    private readonly backImageRef = createRef<Img>();

    constructor(props?: CardProps) {
        super(props)
        
        this.containerRectRef = props.ref
        this.flipValue = this.initialFlipState()
        this.flipState(this.flipValue)

        var widths = () => {
            var width = this.width()
            var flip = this.flipState()
            var front = 0
            var back = 0
    
            if (flip >= 0.5) {
                front = (flip - 0.5) / 0.5
            }
            else {
                back = (0.5 - flip) / 0.5
            }
            return [front*width, back*width]
        }
        this.add(<Rect 
            ref={this.containerRectRef}
            size={this.size()}
            position={this.position()}
            rotation={this.rotation()}
            clip
            radius={16}
            >
            
            <Img src={this.frontSrc()} 
                ref={this.frontImageRef}
                width={() => widths()[0]} 
                height={() => this.height()}
                clip
                radius={16}
            />
    
            <Img src={this.backSrc()} 
                ref={this.backImageRef}
                width={() => widths()[1]} 
                height={()=>this.height()}
                clip
            radius={16}
            />
    
        </Rect>)        
    }

    public isFaceDown():boolean { return this.frontImageRef().width() == 0}

    public *flip(duration: number) {
        var isFaceDown = this.frontImageRef().width() == 0
        var width = this.width()
        if (!isFaceDown) {
            yield* this.frontImageRef().width(0, duration/2, easeInCubic)
            yield* this.backImageRef().width(width, duration/2,easeOutCubic)
        }
        else {
            yield* this.backImageRef().width(0, duration/2, easeInCubic)
            yield* this.frontImageRef().width(width, duration/2,easeOutCubic)
        }
    }
}