interface bmiValues {
    value1: number;
    value2: number;
}

const extractArgs = (args: string[]): bmiValues => {
    return { value1: Number(args[2]), value2: Number(args[3]) };
}

const calculateBmi = (height: number, weight: number): string => {
    if (isNaN(height) || isNaN(weight)) {
        throw new Error('send both args as Numbers!')
    }
    const heightInMeter: number = height / 100;
    const squareOfHeight: number = heightInMeter ** 2;
    const BMI = weight / squareOfHeight;
    if (BMI <= 18.4) {
        return 'underweight';
    } else if (BMI >= 18.5 && BMI <= 24) {
        return 'Noraml (Healthy weight)';
    } else if (BMI > 25 && BMI <= 40) {
        return 'overweight';
    }
};

try {
    const { value1, value2 } = extractArgs(process.argv)
    console.log(calculateBmi(value1, value2))
} catch (err) {
    let errorMessage: string = 'Something bad happened. ';
    if (err instanceof Error) {
        errorMessage += 'Error: ' + err.message
    }
    console.log(errorMessage)
}