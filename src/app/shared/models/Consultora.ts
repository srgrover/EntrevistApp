import { Timestamp } from "firebase/firestore";

export interface Consultora {
    id: string;
    reclutador: string;
    empresa?: string;
    email: string;
    fechaContacto: Timestamp;
    fechaUltContacto?: Timestamp;
    telefono: string;
    observaciones: string;
    ubicacion: string;
  }

  






