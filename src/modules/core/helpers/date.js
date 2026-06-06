import { isValid } from 'date-fns';
const months =
    'Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre'.split(
        ',',
    );

export const formatDate = date => {
    const d = new Date(date);

    if (!isValid(d)) {
        return '...';
    }

    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} de ${month} del ${year}`;
};
