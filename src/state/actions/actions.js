import * as contextActions from './contextActions';
import * as asistenciasActions from './asistenciasActions';
import * as calificacionesActions from './calificacionesActions';
import * as mensajesActions from './mensajesActions';
import * as notificacionesActions from './notificacionesActions';
import * as tareasActions from './tareasActions';
import * as tiposTareasActions from './tiposTareasActions';
import * as estudiantesActions from './estudiantesActions';
import * as profilesActions from './profilesActions';
import * as recipientsActions from './recipientsActions';

const actions = {
	context: {...contextActions},
	asistencias: {...asistenciasActions},
	calificaciones: {...calificacionesActions},
	mensajes: {...mensajesActions},
	notificaciones: {...notificacionesActions},
	tareas: {...tareasActions},
	tiposTareas: {...tiposTareasActions},
	estudiantes: {...estudiantesActions},
	profiles: {...profilesActions},
	recipients: {...recipientsActions}
};

export default actions;