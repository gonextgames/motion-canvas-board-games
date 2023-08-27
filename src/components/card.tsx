import {createRef, Reference, ReferenceReceiver} from '@motion-canvas/core/lib/utils'
import {Img, NodeProps, RectProps} from '@motion-canvas/2d/lib/components'
import {CodeBlock} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components'
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow'
import {Direction, Vector2, Vector2Signal} from '@motion-canvas/core/lib/types'
import { easeInBack, easeInCubic, easeOutBack, easeOutCubic, linear, tween } from '@motion-canvas/core/lib/tweening';

import {createSignal, SignalValue, SimpleSignal} from '@motion-canvas/core/lib/signals';
import { initial, signal } from '@motion-canvas/2d/lib/decorators';


export interface CardProps extends RectProps  {
    frontSrc: SignalValue<string>, 
    backSrc: SignalValue<string>,
    initialFlipState?: SignalValue<number>
}

export class Card extends Rect {
    @signal()
    public declare readonly frontSrc: SimpleSignal<string, this>

    @signal()
    public declare readonly backSrc: SimpleSignal<string, this>

    @initial(1)
    @signal()
    public declare readonly initialFlipState: SimpleSignal<number, this>

    
    public flipState = createSignal(0.5)

    private containerRectRef:ReferenceReceiver<Card>;
    private readonly frontImageRef = createRef<Img>();
    private readonly backImageRef = createRef<Img>();

    constructor(props?: CardProps) {
        super(props)
        
        this.containerRectRef = props.ref
        this.flipState(this.initialFlipState())

        var cardRender = this.renderCard()
        this.add(cardRender)        
    }

    public renderCard() {
        return <Rect 
            ref={this.containerRectRef}
            width={()=>this.width()}
            height={()=>this.height()}
            size={()=>this.size()}
            clip
            radius={16}
            >
            
            <Img src={this.frontSrc()} 
                ref={this.frontImageRef}
                width={() => {
                    return this.width() * (this.flipState() > 0.5 ? (this.flipState() - 0.5) / 0.5 : 0) } 
                }
                height={()=> this.height()}
                radius={16}
                clip
            />

            <Img src={this.backSrc()} 
                ref={this.backImageRef}
                width={() => {
                    return this.width() * (this.flipState() < 0.5 ? (0.5 - this.flipState()) / 0.5 : 0) 
                }} 
                height={()=>this.height()}
                radius={16}
                clip
            />

        </Rect>
    }
}