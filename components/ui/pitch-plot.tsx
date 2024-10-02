import React, { SVGProps } from "react"
import { cn } from "../../lib/utils"

/**
 * PitchPlotPitch
 * This structure is the minimum data structure representing a single pitch 
 * that is currently required to properly render pitches on this pitch plot.
 * 
 * Feel free to augment the type of PitchPlotPitch if that would improve your implementation.
 */

type PitchPlotPitch = {
    pitchId: string;
    locationX: number;
    locationZ: number;
} & SVGProps<SVGCircleElement>


/**
 * PitchPlotProps
 * This structure is the minimum data structure representing the props for this component
 * that is required to implement all functionality in the prompt.
 * 
 * Feel free to augment the type of PitchPlotProps if that would improve your implementation.
 */
type PitchPlotProps = {
    pitches: PitchPlotPitch[];
    onPitchClick?: (pitch: PitchPlotPitch) => void
}


const PitchPlot = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & PitchPlotProps
>(({
    className,
    pitches,
    onPitchClick,
    ...props }, ref) => {

    // height and width are in feet
    const height = 5
    const width = 4

    const baseballDiameter = 2.9 / 12

    // the coordinate dimensions of the solid-line strike zone
    const strikeZone = {
        left: 17 / 2 * -1 / 12,
        width: 17 / 12,
        top: 43 / 12,
        height: 25 / 12,
    }
    // the coordinate dimensions of the dotted-line strike zone
    // this strike zone represents the width of one baseball outside of the true strike zone
    const outerStrikeZone = {
        left: strikeZone.left - baseballDiameter,
        width: strikeZone.width + baseballDiameter * 2,
        top: strikeZone.top + baseballDiameter,
        height: strikeZone.height + baseballDiameter * 2,
    }

    // positive x-coordinates are towards first base and negative x-coordinates are towards third base
    return (
        <div
            ref={ref}
            className={cn(className)}
            {...props}
        >
            <svg
                className="border border-border rounded-lg"
                viewBox={`${width / 2 * -1} 0 ${width} ${height}`}
            >
                {
                    pitches.map(p => {
                        return <circle
                            key={p.pitchId}
                            cx={p.locationX}
                            cy={height - p.locationZ}
                            fill={p.fill}
                            r={baseballDiameter / 2}
                            onClick={() => onPitchClick ? onPitchClick(p) : undefined}
                        />
                    })
                }
                <rect
                    x={strikeZone.left}
                    y={height - strikeZone.top}
                    width={strikeZone.width}
                    height={strikeZone.height}
                    fill="transparent"
                    stroke="black"
                    strokeWidth={.3 / 12}
                    className="pointer-events-none"
                ></rect>
                <rect
                    x={outerStrikeZone.left}
                    y={height - outerStrikeZone.top}
                    width={outerStrikeZone.width}
                    height={outerStrikeZone.height}
                    fill="transparent"
                    stroke="black"
                    strokeWidth={.15 / 12}
                    strokeDasharray={'.1 .1'}
                    className="pointer-events-none"
                ></rect>
            </svg>
            <span className="text-xs italic">Pitcher perspective</span>
        </div >
    )
})
PitchPlot.displayName = "PitchPlot"

export { PitchPlot }

export type {
    PitchPlotPitch,
    PitchPlotProps
}