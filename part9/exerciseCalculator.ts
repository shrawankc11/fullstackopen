interface Exercise {
    periodLength: number;
    trainingDay: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const countPeriod = (hours: number[]): number => {
    let count: number = 0;
    for (let hour of hours) {
        if (hour !== 0) count+= hour
    }
    return count
}

const calculateExercise = (dailyHours: Array<number>, target: number): Exercise => {
    let ratingDescription: string, rating: number, success: boolean = false;
    const periodLength: number = dailyHours.length;
    const trainingDay: number = countPeriod(dailyHours);
    const average: number = dailyHours.reduce((prev, current) => prev + current) / periodLength;
    if (average > target) {
        ratingDescription = 'nice work! you\'ve reached your goal kudos!'
        rating = 3
        success = true
    } else if (average - target < 0.5) {
        ratingDescription = 'not too bad but could be better'
        rating = 2
    } else if (average < target) {
        ratingDescription = 'not enough work harder!'
        rating = 1
    };
    return {
        periodLength,
        trainingDay,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
};

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))
