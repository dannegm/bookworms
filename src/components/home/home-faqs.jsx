import { cn } from '@/helpers/utils';
import RichText from '@/ui/rich-text';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/ui/accordion';
import { Eyebrow, SectionTitle, PageInner } from '@/components/home/home-primitives';

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
            'El repositorio ha sido actualizado por última vez el d(library.last_update), por lo que los libros publicados después de esa fecha pueden no estar disponibles.',
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
        question: '¿Puedo leer estos libros en mi Kindle?',
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

const FaqItem = ({ question, answer, index }) => {
    const num = String(index + 1).padStart(2, '0');

    return (
        <AccordionItem value={`faq-${index}`} className='border-0'>
            <AccordionTrigger
                className={cn(
                    'hover:no-underline py-4.5 font-normal group',
                    '[&>svg]:hidden',
                )}
            >
                <div className='flex gap-4 items-start min-w-0 flex-1'>
                    <span className='font-merriweather text-[11px] text-brand/50 shrink-0 pt-0.5 w-4 tabular-nums'>
                        {num}
                    </span>
                    <span className='text-sm font-medium text-foreground leading-[1.45] font-noto transition-colors duration-150 group-data-[state=open]:text-brand'>
                        {question}
                    </span>
                </div>
                <div className='relative shrink-0 mt-0.75 size-4 ml-5'>
                    <span className='absolute inset-x-0.75 top-1.75 h-[1.5px] rounded-sm transition-colors duration-200 bg-muted-foreground group-data-[state=open]:bg-brand' />
                    <span className='absolute inset-y-0.75 left-1.75 w-[1.5px] rounded-sm transition-all duration-200 bg-muted-foreground group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0' />
                </div>
            </AccordionTrigger>
            <AccordionContent className='pb-4.5 pl-8'>
                <div className='flex flex-col gap-4'>
                    {answer.map((line, i) => (
                        <p key={i} className='text-sm text-foreground/70 leading-[1.8] font-noto'>
                            <RichText>{line}</RichText>
                        </p>
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};

export const HomeFaqs = () => (
    <PageInner>
        <Eyebrow className='mb-1.5'>Preguntas frecuentes</Eyebrow>
        <SectionTitle className='mb-5'>Todo lo que necesitas saber</SectionTitle>
        <Accordion
            type='single'
            collapsible
            className='divide-y divide-border border-y border-border'
        >
            {faqsData.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
        </Accordion>
    </PageInner>
);
