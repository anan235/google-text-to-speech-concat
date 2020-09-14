<a name="PollyTextSplit"></a>

## PollyTextSplit
Splits text for batches.

**Kind**: global class  

* [PollyTextSplit](#PollyTextSplit)
    * [new PollyTextSplit(softLimit, hardLimit, extraSplitChars)](#new_PollyTextSplit_new)
    * [.configure(options)](#PollyTextSplit+configure)
    * [.split(text)](#PollyTextSplit+split) ⇒ <code>Array.&lt;string&gt;</code>
    * [.splitIndex(text)](#PollyTextSplit+splitIndex) ⇒ <code>number</code>

<a name="new_PollyTextSplit_new"></a>

### new PollyTextSplit(softLimit, hardLimit, extraSplitChars)
Set the default options.


| Param | Type |
| --- | --- |
| softLimit | <code>number</code> | 
| hardLimit | <code>number</code> | 
| extraSplitChars | <code>string</code> | 

<a name="PollyTextSplit+configure"></a>

### pollyTextSplit.configure(options)
Set the configuration options.
This is optional.
Default options are perfect for working with AWS Polly TTS.

**Kind**: instance method of [<code>PollyTextSplit</code>](#PollyTextSplit)  
**Throws**:

- <code>ConfigurationValidationError</code> Argument `options` is not valid.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Object with configuration options. |
| options.softLimit | <code>number</code> | <code>1000</code> | Limit of a min batch size. |
| options.hardLimit | <code>number</code> | <code>1500</code> | Limit of a max possible batch size. |
| [options.extraSplitChars] | <code>string</code> | <code>&quot;,;&quot;</code> | String with characters, that can be used as split markers. Optional parameter. |

<a name="PollyTextSplit+split"></a>

### pollyTextSplit.split(text) ⇒ <code>Array.&lt;string&gt;</code>
Splits text for batches of <=1500 chars or of custom size set by configure().

**Kind**: instance method of [<code>PollyTextSplit</code>](#PollyTextSplit)  
**Returns**: <code>Array.&lt;string&gt;</code> - Array with text batches.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Text input for splitting. |

<a name="PollyTextSplit+splitIndex"></a>

### pollyTextSplit.splitIndex(text) ⇒ <code>number</code>
Search for possible split text index.

**Kind**: instance method of [<code>PollyTextSplit</code>](#PollyTextSplit)  
**Returns**: <code>number</code> - Position (index of `text` array) for possible split (including).  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Text input for searching for split position. |

