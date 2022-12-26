const spawnOptions = (values) => {
    const baseValues = {
        shell: true,
    }
    const params = Object.assign({}, baseValues, values);
    return params;
}

module.exports = spawnOptions;