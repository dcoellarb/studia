import { combineReducers } from 'redux';
import contextReducer from './contextReducer';
import asistenciasReducer from './asistenciasReducer';
import calificacionesReducer from './calificacionesReducer';
import mensajesReducer from './mensajesReducer';
import notificacionesReducer from './notificacionesReducer';
import tareasReducer from './tareasReducer';
import tiposTareasReducer from './tiposTareasReducer';
import estudiantesReducer from './estudiantesReducer';
import profilesReducer from './profilesReducer';

const reducers = combineReducers({
  context: contextReducer,
  asistencias: asistenciasReducer,
  calificaciones: calificacionesReducer,
  mensajes: mensajesReducer,
  notificaciones: notificacionesReducer,
  tareas: tareasReducer,
  tiposTareas: tiposTareasReducer,
  estudiantes: estudiantesReducer,
  profiles: profilesReducer
});

export default reducers;

import * as contextSelectors from './contextReducer';
export const getCurrentUser = (state) => {
  return contextSelectors.getCurrentUser(state.context);
}
export const getCurrentComponent = (state) => {
  return contextSelectors.getCurrentComponent(state.context);
}
export const getCalendarSearch = (state) => {
  return contextSelectors.getCalendarSearch(state.context);
}
export const getNotificacionesSearch = (state) => {
  return contextSelectors.getNotificacionesSearch(state.context);
}
export const getMensajesSearch = (state) => {
  return contextSelectors.getMensajesSearch(state.context);
}
export const getCalendarioFiltro = (state) => {
  return contextSelectors.getCalendarioFiltro(state.context);
}
export const getSelectedEstudiante = (state) => {
  return contextSelectors.getSelectedEstudiante(state.context);  
}

import * as asistenciasSelector from './asistenciasReducer';
export const getInasistencias = (state) => {
  return asistenciasSelector.getInasistencias(state.asistencias);
}
export const getInasistenciasBySelectedEstudiante = (state) => {
  return asistenciasSelector.getInasistenciasBySelectedEstudiante(getSelectedEstudiante(state), state.asistencias);  
}

import * as calificacionesSelector from './calificacionesReducer';
export const getCalificaciones = (state) => {
  return calificacionesSelector.getCalificaciones(state.calificaciones);
}
export const getCalificacionesBySelectedStudent = (state) => {
  return calificacionesSelector.getCalificacionesBySelectedStudent(getSelectedEstudiante(state), state.calificaciones);
}

import * as mensajesSelector from './mensajesReducer';
export const getMensajes = (state) => {
  return mensajesSelector.getMensajes(state.mensajes);
}
export const getMensajeComentarios = (id, state) => {
  return mensajesSelector.getMensajeComentarios(id, state.mensajes);
}

import * as notificacionesSelector from './notificacionesReducer';
export const getNotificaciones = (state) => {
  return notificacionesSelector.getNotificaciones(state.notificaciones);
}

import * as tareasSelector from './tareasReducer';
export const getTareas = (state) => {
  return tareasSelector.getTareas(state.tareas);
}
export const getTareasBySelectedStudent = (state) => {
  return tareasSelector.getTareasBySelectedStudent(getSelectedEstudiante(state), state.tareas);
}
export const getTareaComentarios = (id, state) => {
  return tareasSelector.getTareaComentarios(id, state.tareas);
}

import * as tiposTareasSelector from './tiposTareasReducer';
export const getTiposTareas = (state) => {
  return tiposTareasSelector.getTiposTareas(state.tiposTareas);
}

import * as estudiantesSelector from './estudiantesReducer';
export const getEstudiantes = (state) => {
  return estudiantesSelector.getEstudiantes(state.estudiantes, state.context);
}

import * as profilesSelector from './profilesReducer';
export const getProfiles = (state) => {
  return profilesSelector.getProfiles(state.profiles);
}
