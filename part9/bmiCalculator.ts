const calculateBmi = (height: number, weight: number) => {
    let heightInMeter: number = height / 100;
    const squareOfHeight: number = heightInMeter ** 2;
    const BMI = weight / squareOfHeight;
    if (BMI <= 18.4) {
        return 'Abnormal (Under weight)';
    } else if (BMI >= 18.5 && BMI <= 24) {
        return 'Noraml (Healthy weight)';
    } else if (BMI > 30 && BMI <= 40){
        return 'Abnormal (Over weight)'
    }
};

console.log(calculateBmi(180, 74))
