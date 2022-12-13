
const calculateBmi = (height: number, weight: number): string => {
    if (isNaN(height) || isNaN(weight)) {
        throw new Error('send both args as Numbers!');
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
    } else {
        return 'invalid BMI entered';
    }
};

export { calculateBmi as bmiCalculator};