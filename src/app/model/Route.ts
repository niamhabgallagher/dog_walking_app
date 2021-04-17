import { ToiletTally } from './ToiletTally';
import { Path } from './Path';

export interface Route {
    start: Number;
    finished: Number;
    path: Path[];
    length?: String;
    toiletTally?: ToiletTally;
    walkNotes: String;
}