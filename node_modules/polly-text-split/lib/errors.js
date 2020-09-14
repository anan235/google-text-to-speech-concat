class ConfigurationValidationError extends Error {
    /**
     * Constructs the ConfigurationValidationError class.
     * @param {string} message
     * @constructor
     */
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

module.exports = { ConfigurationValidationError }
