import { Timestamp } from 'firebase/firestore';

export interface Cliente{
    id: string;
    nombreEmpresa: string;
    personaContacto: string;
    descripcionPuesto: string;
    tipoContrato: string;
    modalidadTrabajo: string;
    ubicacion: string;
    estadoPosicion: string;
    favorito: boolean;
    fechaCambioEstado: Timestamp;
    fechaEntrevista: Timestamp;
    fechaUltEntrevista: Timestamp;
    motivoRechazo: string;
    observaciones: string;
    rechazado: boolean;
    rechazadoPor: string;
}









