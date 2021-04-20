export interface DogInfo {
    id: Number;
    name: String;
    dob: string;
    age?: String;
    weight: { num: Number; metric: String; };
    breed: String;
    favFood: String;
    notes: String;
    image: String;
}