const t = require('tap')
const textSplit = require('../lib/polly-text-split')
const { ValidationError, SSMLParseError } = require('../lib/errors')

/*-----------------------------------------------------------------------------
 *  Tests for configuration validation
 *----------------------------------------------------------------------------*/

t.throws(function() {
    textSplit.configure()
}, ValidationError)

t.throws(function() {
    textSplit.configure('')
}, ValidationError)

/*-----------------------------------------------------------------------------
 *  Tests for splitting plain text
 *----------------------------------------------------------------------------*/

const defaultOptions = {
    softLimit: 10,
    hardLimit: 15,
}

const testCasesText = [
    {
        options: defaultOptions,
        text: 'Simple text.',
        result: ['Simple text.'],
    },
    {
        options: defaultOptions,
        text: 'Simple text. Simple text.',
        result: ['Simple text.', ' Simple text.'],
    },
    {
        options: defaultOptions,
        text: 'Simple text. Simple text. Simple text.',
        result: ['Simple text.', ' Simple text.', ' Simple text.'],
    },
    {
        options: defaultOptions,
        text: 'Simple text, simple text.',
        result: ['Simple text,', ' simple text.'],
    },
    {
        options: defaultOptions,
        text: 'Simple text; simple text.',
        result: ['Simple text;', ' simple text.'],
    },
    {
        options: defaultOptions,
        text: 'Simple text simple text.',
        result: ['Simple text ', 'simple text.'],
    },
    {
        options: defaultOptions,
        text: 'Simple textsimple text.',
        result: ['Simple text', 'simple text.'],
    },
    {
        options: {
            softLimit: 9,
            hardLimit: 15,
            extraSplitChars: ':-',
        },
        text: 'First part: second part - third part',
        result: ['First part:', ' second part -', ' third part'],
    },
]

testCasesText.forEach(test => {
    if (test.options) {
        textSplit.configure(test.options)
    }

    t.same(textSplit.split(test.text), test.result)
})
