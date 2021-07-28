interface Shape {
    calculateArea: () => number
}

export const calculateArea = (shape: Shape): number =>
    shape.calculateArea()

const newCircle = (radius: number): Shape => ({
    calculateArea: () => radius * radius * Math.PI
});

const newSquare = (side: number): Shape => ({
    calculateArea: () => side * side
});

const newRectiangle = (height: number, width: number): Shape => ({
    calculateArea: () => height * width
});



console.log(
    [newCircle(2), newSquare(2), newRectiangle(10, 20)]
        .map(calculateArea)
)