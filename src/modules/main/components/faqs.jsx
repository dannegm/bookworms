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
            'El repositorio ha sido actualizado por última vez a finales del 2023, por lo que los libros publicados después de esa fecha pueden no estar disponibles.',
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
            'Los libros en el repositorio están disponibles únicamente en formato EPUB sin embargo, contamos con la opción de enviar a un dispositivo Kindle por medio de correo electrónico.',
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
        question: 'El sitio muestra una alerta que dice que el servicio no está disponible',
        answer: [
            'Si ves un mensaje que indica que el servicio no está disponible, es posible que el repositorio esté temporalmente fuera de servicio para mantenimiento o actualización.',
            'Te recomendamos intentar acceder más tarde. Generalmente la alerta está acompañada de un mensaje que indica cuándo se espera que el servicio vuelva a estar disponible.',
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
                                <p key={i}>{line}</p>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};
