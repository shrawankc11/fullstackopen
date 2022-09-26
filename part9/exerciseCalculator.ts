interface Exercise {
    periodLength: number;
    trainingDay: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface argsParse {
    dailyHours: number[];
    target: number;
}

const parseArgs = (args: Array<string>): argsParse => {
    const argsToTraverse: string[] = args.slice(3)
    return {
        dailyHours: argsToTraverse.map(args => {
            if (isNaN(Number(args))) {
                throw new Error('please provide arguments as numbers!')
            } else return Number(args)
        }),
        target: Number(args[2])
    }
}

const countPeriod = (hours: number[]): number => {
    let count: number = 0;
    for (let hour of hours) {
        if (hour !== 0) count++
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

try {
    const { dailyHours, target } = parseArgs(process.argv)
    console.log(calculateExercise(dailyHours, target))

} catch (error) {
    let errorMessage: string = 'Something went wrong. '
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message
    }
    console.log(errorMessage)
}
