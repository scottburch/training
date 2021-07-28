interface Shape {
    type: 'circle' | 'square',
    params: Record<'side' | 'radius', number>
}

const calculateArea = (shape: Shape) => {
    if (shape.type === 'square') {
        return shape.params.side * shape.params.side
    }
    if (shape.type === 'circle') {
        return shape.params.radius * shape.params.radius * Math.PI
    }
}

console.log([
    {type: 'circle', params: {radius: 10}} as Shape,
    {type: 'square', params: {side: 5}} as Shape
].map(calculateArea))


