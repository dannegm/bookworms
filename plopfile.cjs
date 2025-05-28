module.exports = function (plop) {
    plop.setGenerator('component', {
        description: 'Create a Component structure',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Component name:',
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
                path: '{{dest}}/{{kebabCase name}}.jsx',
                templateFile: 'templates/component.jsx.hbs',
            },
        ],
    });

    plop.setGenerator('hook', {
        description: 'Create a Hook structure',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Hook name:',
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
                path: '{{dest}}/use-{{kebabCase name}}.jsx',
                templateFile: 'templates/hook.jsx.hbs',
            },
        ],
    });
};
