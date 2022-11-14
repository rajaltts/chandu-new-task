import React, { useEffect, useRef, forwardRef } from 'react'

const CustomCanvasBorder = forwardRef(
    ({ startX, startY, canvasWidth, canvasHeight, initialTopValue, dynamicTopValue, canvasStyles }) => {
        const customCanvasBorderRef = useRef(null)

        /**
         * Draws a rounded rectangle using the current state of the canvas.
         * If you omit the last three params, it will draw a rectangle
         * outline with a 5 pixel border radius
         * @param {CanvasRenderingContext2D} ctx
         * @param {Number} x The top left x coordinate
         * @param {Number} y The top left y coordinate
         * @param {Number} width The width of the rectangle
         * @param {Number} height The height of the rectangle
         * @param {Number} [radius = 5] The corner radius; It can also be an object
         *                 to specify different radii for corners
         * @param {Number} [radius.tl = 0] Top left
         * @param {Number} [radius.tr = 0] Top right
         * @param {Number} [radius.br = 0] Bottom right
         * @param {Number} [radius.bl = 0] Bottom left
         * @param {Boolean} [fill = false] Whether to fill the rectangle.
         * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
         */
        const roundRect = (ctx, x, y, width, height, radius = 5, fill = false, stroke = true) => {
            if (typeof radius === 'number') {
                radius = { tl: radius, tr: radius, br: radius, bl: radius }
            } else {
                radius = { ...{ tl: 0, tr: 0, br: 0, bl: 0 }, ...radius }
            }
            ctx.beginPath()
            ctx.moveTo(x + radius.tl, y)
            ctx.lineTo(x + width - radius.tr, y)
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
            ctx.lineTo(x + width, y + height - radius.br)
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
            ctx.lineTo(x + radius.bl, y + height)
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
            ctx.lineTo(x, y + radius.tl)
            ctx.quadraticCurveTo(x, y, x + radius.tl, y)
            ctx.closePath()
            if (fill) {
                ctx.fill()
            }
            if (stroke) {
                ctx.stroke()
            }
        }

        const draw = (ctx) => {
            roundRect(ctx, startX, startY, canvasWidth, canvasHeight)
            // To change the color on the rectangle, just manipulate the context
            ctx.strokeStyle = 'rgb(255, 0, 0)'
            ctx.fillStyle = 'rgba(255, 255, 0, .5)'
        }

        useEffect(() => {
            const context = customCanvasBorderRef.current.getContext('2d')
            //Our draw come here
            draw(context)
        }, [draw])

        useEffect(() => {
            customCanvasBorderRef.current.style.top =
                (customCanvasBorderRef.current.getBoundingClientRect().top / initialTopValue) * dynamicTopValue
        }, [dynamicTopValue])

        return (
            <canvas
                style={canvasStyles}
                height={canvasHeight + 5}
                width={canvasWidth + 5}
                ref={customCanvasBorderRef}
            />
        )
    }
)

CustomCanvasBorder.displayName = 'CustomCanvasBorder'

CustomCanvasBorder.propTypes = {}

export default CustomCanvasBorder
