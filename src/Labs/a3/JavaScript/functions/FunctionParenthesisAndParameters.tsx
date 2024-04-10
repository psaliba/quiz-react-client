function FunctionParenthesisAndParameters() {

    const square = (a: number) => a * a;
    const plusOne = (a: number) => a + 1;
    const twoSquared = square(2);
    const threePlusOne = plusOne(3);

    return (
        <div>
            <h2>Parenthesis and parameters</h2>
            two squared = {twoSquared} <br/>
            square(2) = { square(2)} <br/>
            threePlusOne = {threePlusOne} <br/>
            plusOne(3) = { plusOne(3)}<br/>
        </div>
    )
}

export default FunctionParenthesisAndParameters;