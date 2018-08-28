import { Client } from "./client";
import { Restaurant } from "../business/restaurant";
import { Notification } from "../notification";

export class Responsible extends Client{
    restaurants : Restaurant[];
	notifications : Notification
}
