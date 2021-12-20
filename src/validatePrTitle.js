const config = require('@commitlint/config-conventional');
const lint = require('@commitlint/lint').default;
const load = require('@commitlint/load').default;

module.exports = async function validatePrTitle(prTitle) {
  const opts = await load(config);
  const result = await lint(
    prTitle,
    opts.rules,
    opts.parserPreset ? {parserOpts: opts.parserPreset.parserOpts} : {}
  );

  if (!result.valid) {
    const errorMessages = result.errors.map((error) => error.message);
    throw new Error(errorMessages.join('; '));
  }
};
