const dayOfWeek = (day) => {
  switch(day){
    case 0:
      return 'Domingo';
    case 1:
      return 'Lunes';
    case 2:
      return 'Martes';
    case 3:
      return 'Miércoles';
    case 4:
      return 'Jueves';
    case 5:
      return 'Viernes';
    case 6:
      return 'Sábado';
  }
}

const month = (month) => {
  switch(month){
    case 0:
      return 'Enero';
    case 1:
      return 'Febrero';
    case 2:
      return 'Marzo';
    case 3:
      return 'Abril';
    case 4:
      return 'Mayo';
    case 5:
      return 'Junio';
    case 6:
      return 'Julio';
    case 7:
      return 'Agosto';
    case 8:
      return 'Septiembre';
    case 9:
      return 'Octubre';
    case 10:
      return 'Noviembre';
    case 11:
      return 'Diciembre';
  }
}

export const stringifyDate = (date) => {
  if (!date)
    return '';

  const dateOnly = new Date(date.getTime());
  dateOnly.setHours(0,0,0,0);
  const today = new Date();
  today.setHours(0,0,0,0);
  const yesterday = new Date();
  yesterday.setHours(0,0,0,0);
  yesterday.setTime(today.getTime() - (1 * 86400000));
  const tomorrow = new Date();
  tomorrow.setHours(0,0,0,0);
  tomorrow.setTime(today.getTime() + (1 * 86400000));
  const weekStart = new Date();
  weekStart.setHours(0,0,0,0);
  weekStart.setTime(today.getTime() - (3 * 86400000));
  const weekEnd = new Date();
  weekEnd.setHours(0,0,0,0);
  weekEnd.setTime(today.getTime() + (3 * 86400000));

  if (dateOnly.getTime() === today.getTime()) {
    return `hoy a las ${date.getHours()}:${date.getMinutes()}`
  } else if (dateOnly.getTime() === yesterday.getTime()) {
    return `ayer a las ${date.getHours()}:${date.getMinutes()}`
  } else if (dateOnly.getTime() === tomorrow.getTime()) {
    return `mañana a las ${date.getHours()}:${date.getMinutes()}`
  } else if (dateOnly.getTime() >= weekStart.getTime() && dateOnly.getTime() <= weekEnd.getTime()) {
    return `el ${dayOfWeek(date.getDay())} a las ${date.getHours()}:${date.getMinutes()}`
  } else {
    return `el ${date.getDate()} de ${month(date.getMonth())} a las ${date.getHours()}:${date.getMinutes()}`
  }
}

export const stringifyShortDate = (date) => {
  if (date) {
    let day = date.getDate() < 10 ? 0 + date.getDate().toString() : date.getDate().toString();
    let month = date.getMonth() < 10 ? 0 + date.getMonth().toString() : date.getMonth().toString();
    let year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;    
  } else {
    return '';
  }
}
