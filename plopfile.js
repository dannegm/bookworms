module.exports = function (plop) {
    plop.setGenerator('element', {
        description: 'Create a Element component structure',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Element name:',
            },
            {
                type: 'input',
                name: 'dest',
                message: 'Destination directory? (leave empty for current directory)',
                default: process.cwd(),
            },
        ],
        actions: [
            {
                type: 'add',
                path: './src/components/common/{{kebabCase name}}.jsx',
                templateFile: 'templates/element/component.jsx.hbs',
            },
        ],
    });

    plop.setGenerator('icon', {
        description: 'Create a Icon component structure',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Provider name:',
            },
        ],
        actions: [
            {
                type: 'add',
                path: './src/components/icons/{{kebabCase name}}.jsx',
                templateFile: 'templates/icon/component.jsx.hbs',
            },
        ],
    });

    plop.setGenerator('provider', {
        description: 'Create a Provider component structure',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Provider name:',
            },
        ],
        actions: [
            {
                type: 'add',
                path: './src/providers/{{kebabCase name}}-provider.jsx',
                templateFile: 'templates/provider/component.jsx.hbs',
            },
        ],
    });
};
