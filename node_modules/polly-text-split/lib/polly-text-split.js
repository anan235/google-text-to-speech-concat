const { ConfigurationValidationError } = require('./errors')
const { SOFT_LIMIT, HARD_LIMIT, EXTRA_SPLIT_CHARS } = require('./defaults')


// Private properties
const _softLimit = Symbol()
const _hardLimit = Symbol()
const _extraSplitChars = Symbol()
const _batches = Symbol()

/**
 * Splits text for batches.
 * @class
 */
class PollyTextSplit {
    /**
     * Set the default options.
     *
     * @param {number} softLimit
     * @param {number} hardLimit
     * @param {string} extraSplitChars
     * @constructor
     */
    constructor(softLimit, hardLimit, extraSplitChars) {
        this[_softLimit] = softLimit
        this[_hardLimit] = hardLimit
        this[_extraSplitChars] = extraSplitChars
        this[_batches] = []
    }

    /**
     * Set the configuration options.
     * This is optional.
     * Default options are perfect for working with AWS Polly TTS.
     *
     * @param {Object} options Object with configuration options.
     * @param {number} options.softLimit=1000 Limit of a min batch size.
     * @param {number} options.hardLimit=1500 Limit of a max possible batch size.
     * @param {string} [options.extraSplitChars=,;] String with characters, that can be used as split markers. Optional parameter.
     * @throws {ConfigurationValidationError} Argument `options` is not valid.
     */
    configure(options) {
        if (!options) {
            throw new ConfigurationValidationError('Parameter `options` is missing.')
        }

        if (typeof options !== 'object') {
            throw new ConfigurationValidationError('Parameter `options` must be an object.')
        }
        this[_softLimit] = options.softLimit
        this[_hardLimit] = options.hardLimit

        if (options.extraSplitChars && typeof options.extraSplitChars === 'string') {
            this[_extraSplitChars] = options.extraSplitChars
        }
    }

    /**
     * Splits text for batches of <=1500 chars or of custom size set by configure().
     *
     * @param {string} text Text input for splitting.
     * @returns {Array<string>} Array with text batches.
     */
    split(text) {
        const splitIdx = this.splitIndex(text)

        if (splitIdx === text.length - 1) {
            this[_batches].push(text)
            return this[_batches].splice(0)
        } else {
            this[_batches].push(text.slice(0, splitIdx + 1))
        }

        return this.split(text.slice(splitIdx + 1))
    }

    /**
     * Search for possible split text index.
     *
     * @param {string} text Text input for searching for split position.
     * @returns {number} Position (index of `text` array) for possible split (including).
     */
    splitIndex(text) {
        if (text.length < this[_hardLimit]) {
            return text.length - 1
        }

        let i = this[_hardLimit]
        let splitIdx

        while (i > this[_softLimit]) {
            // search for .
            if (text[i] === '.') return i
            i--
        }

        if (!splitIdx) {
            // no . found - check for other split chars
            i = this[_hardLimit]
            while (i > this[_softLimit]) {
                if (this[_extraSplitChars].indexOf(text[i]) !== -1) return i
                i--
            }

            if (!splitIdx) {
                // no split chars found - split by the nearest space char
                i = this[_hardLimit]
                while (i > this[_softLimit]) {
                    if (' \t\n\r\v'.indexOf(text[i]) !== -1) return i
                    i--
                }
            }

            // hard split
            if (!splitIdx) return i
        }
    }
}

module.exports = new PollyTextSplit(SOFT_LIMIT, HARD_LIMIT, EXTRA_SPLIT_CHARS)