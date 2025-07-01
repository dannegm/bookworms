import RichText from '@/modules/core/components/rich-text';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/modules/shadcn/ui/accordion';

const faqsData = [
    {
        question: '¿Cómo puedo buscar un libro específico?',
        answer: [
            'Puedes utilizar la barra de búsqueda en la parte superior de la página para buscar por título, autor o serie.',
            'Asegúrate de escribir correctamente el nombre del libro o autor para obtener mejores resultados.',
        ],
    },
    {
        question: '¿Qué tipo de libros están disponibles en el repositorio?',
        answer: [
            'El repositorio incluye una amplia variedad de libros, desde clásicos hasta obras contemporáneas, abarcando diferentes géneros y autores.',
        ],
    },
    {
        question: '¿Existen libros que se hayan publicado recientemente?',
        answer: [
            'El repositorio ha sido actualizado por última vez a **finales del 2023**, por lo que los libros publicados después de esa fecha pueden no estar disponibles.',
        ],
    },
    {
        question: 'El libro que busco no está disponible, ¿qué puedo hacer?',
        answer: [
            'Lamentablemente, si un libro no está disponible en el repositorio, no podemos proporcionarlo.',
        ],
    },
    {
        question: '¿Sólo hay libros en español o también en otros idiomas?',
        answer: [
            'Nuestra colección sólo incluye libros en español.',
            'No contamos con libros en otros idiomas en este momento.',
        ],
    },
    {
        question: '¿En qué formatos están disponibles los libros?',
        answer: [
            'Los libros en el repositorio están disponibles únicamente en formato **EPUB** sin embargo, contamos con la opción de enviar a un dispositivo Kindle por medio de correo electrónico.',
            'Si escribes un correo personal en el formulario de enviar al Kindle, recibirás una copia del libro en formato MOBI.',
        ],
    },
    {
        question: '¿Puedo leer los libros en línea?',
        answer: [
            'Sí, puedes leer los libros en línea utilizando el lector integrado en el sitio web.',
        ],
    },
    {
        question: '¿El lector integrado guarda mi progreso de lectura?',
        answer: [
            'Sí, el lector integrado guarda tu progreso de lectura automáticamente. Puedes continuar leyendo desde donde lo dejaste en cualquier momento.',
            'Se guarda por dispositivo, por lo que si cambias de dispositivo, no podrás continuar desde donde lo dejaste.',
        ],
    },
    {
        question: 'El sitio muestra una alerta que dice que el servicio no está disponible',
        answer: [
            'Si ves un mensaje que indica que el servicio no está disponible, es posible que el repositorio esté temporalmente fuera de servicio para mantenimiento o actualización.',
            'Te recomendamos intentar acceder más tarde. Generalmente la alerta está acompañada de un mensaje que indica cuándo se espera que el servicio vuelva a estar disponible.',
        ],
    },
    {
        question: '¿Puedo enviar leer estos libros en mi Kindle?',
        answer: [
            'Sí, puedes enviar libros a tu Kindle utilizando la opción de envío por correo electrónico.',
            'Para ello, debes proporcionar tu dirección de correo electrónico de Kindle en el formulario de envío.',
            'Una vez que envíes el libro, recibirás una copia en formato MOBI directamente en tu dispositivo Kindle.',
            'También puedes descargar el libro en formato EPUB y convertirlo a MOBI utilizando una herramienta de conversión como <link::https://calibre-ebook.com/>Calibre</link>.',
        ],
    },
    {
        question: 'Me da un error al intentar enviar un libro a mi Kindle',
        answer: [
            'Ya que todos nuestros libros están en formato **EPUB**, el sistema requiere convertir el libro a **MOBI** antes de enviarlo a tu Kindle.',
            'Es posible que el libro que intentas enviar no sea compatible con la conversión a **MOBI**, lo que puede causar un error.',
            'Si encuentras un error al intentar enviar un libro a tu Kindle, te recomendamos descargar el libro en formato **EPUB** y convertirlo manualmente a **MOBI** utilizando una herramienta de conversión como <link::https://calibre-ebook.com/>Calibre</link>.',
        ],
    },
    {
        question: '¿Qué es Calibre y dónde puedo descargarlo?',
        answer: [
            'Calibre es una herramienta de gestión de libros electrónicos que te permite organizar, convertir y transferir libros a diferentes dispositivos.',
            'Puedes descargar Calibre desde su sitio web oficial: <link::https://calibre-ebook.com/>Calibre</link>.',
        ],
    },
];

export const Faqs = () => {
    return (
        <div className='faqs'>
            <h2 className='pb-4 font-merriweather font-bold'>Preguntas Frecuentes</h2>

            <Accordion type='single' className='w-full' collapsible>
                {faqsData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent className='flex flex-col gap-4 text-balance'>
                            {faq.answer.map((line, i) => (
                                <p key={i}>
                                    <RichText>{line}</RichText>
                                </p>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};
