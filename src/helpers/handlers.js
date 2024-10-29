export const onChange = setter => event => {
    setter(event.target.value);
};
