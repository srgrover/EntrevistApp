import { Cliente } from './Cliente';
import { Timestamp } from "firebase/firestore";

export interface Consultora {
    id?: string;
    reclutador: string;
    empresa?: string;
    email?: string;
    fechaContacto: Timestamp;
    fechaCreacion: Timestamp;
    fechaModificacion?: Timestamp;
    telefono?: string;
    observaciones?: string;
    ubicacion?: string;
    usuario: string;
    cliente?: Cliente[];
  }

  






