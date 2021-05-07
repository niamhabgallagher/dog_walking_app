import { ToiletTally } from './ToiletTally';
import { Path } from './Path';

export interface Route {
    id?: any;
    start: Number;
    finished: Number;
    path: Path[];
    length?: String;
    toiletTally?: ToiletTally;
    walkNotes: String;
    dogs: String[];
    likeWalk: boolean;
    lead: boolean;
}