export interface DogInfo {
    id: any;
    name: String;
    dob: string;
    age?: String;
    weight: { num: Number; metric: String; };
    breed: String;
    favFood: String;
    notes: String;
    image: String;
    neededExercise: { hours: Number; minutes: Number; };
}