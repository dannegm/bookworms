import React from 'react';

export const defaultElements = [
    // Italic
    { pattern: /\/\/(.*?)\/\//g, parser: text => <i>{text}</i> },
    // Bold
    { pattern: /\*\*(.*?)\*\*/g, parser: text => <b>{text}</b> },
    // Breakline
    { pattern: /\n/g, parser: () => <br /> },
    { pattern: /\|\|/g, parser: () => <br /> },
    // External link
    {
        pattern: /<link::(.*?)>(.*?)<\/link>/g,
        parser: (url, label) => (
            <a className='font-bold underline' href={url} target='_blank'>
                {label}
            </a>
        ),
    },
    // Internal link
    {
        pattern: /<ilink::(.*?)>(.*?)<\/ilink>/g,
        parser: (url, label) => (
            <a className='font-bold underline' href={url}>
                {label}
            </a>
        ),
    },
];

export const parseText = (text, elements) => {
    const unescapedText = text.replace(/\\([*~_/:\[\]$])/g, (_, char) => `\0${char}`);

    const processSegment = (segment, remainingElements) => {
        if (typeof segment !== 'string' || remainingElements.length === 0) return segment;

        const [{ pattern, parser }, ...rest] = remainingElements;
        const parts = [];
        let match;
        let lastIndex = 0;

        while ((match = pattern.exec(segment)) !== null) {
            parts.push(segment.slice(lastIndex, match.index));
            const [matcher, ...params] = match;
            parts.push(parser(...params, matcher));
            lastIndex = pattern.lastIndex;
        }

        parts.push(segment.slice(lastIndex));
        return parts.flatMap(part => processSegment(part, rest));
    };

    let parsedElements = processSegment(unescapedText, elements);

    return parsedElements.map(segment =>
        typeof segment === 'string' ? segment.replace(/\0([*~_/:\[\]$])/g, '$1') : segment,
    );
};

export default function RichText({ children, elements = defaultElements }) {
    return parseText(children, elements).map((element, index) => (
        <React.Fragment key={index}>{element}</React.Fragment>
    ));
}
