import { Timestamp } from 'firebase/firestore';

export interface Cliente{
    id: string;
    nombreEmpresa: string;
    personaContacto: string;
    descripcionPuesto: string;
    tipoContrato: string;
    modalidadTrabajo: string;
    ubicacion?: string;
    estadoPosicion: string;
    favorito: boolean;
    fechaCreacion: Timestamp;
    fechaModificacion?: Timestamp;
    fechaCambioEstado: Timestamp;
    motivoRechazo?: string;
    observaciones?: string;
    rechazado?: boolean;
    rechazadoPor?: string;
    usuario: string;
}









