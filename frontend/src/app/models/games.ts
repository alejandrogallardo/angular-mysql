//import { Title } from '@angular/platform-browser';

export interface Game {
    // ? para que no sea requerido
    id?: number,
    title?: string,
    description?: string,
    image?: string,
    created_at?: Date
};