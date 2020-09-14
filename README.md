# Google Text To Speech Concat
Automatically split large text into parts Google's Text To Speech API can consume, and concatenate the resulting audio into one single buffer.

Google's Text To Speech API has a [5.000 character limit](https://cloud.google.com/text-to-speech/quotas). So, if you want to synthesize large text's, you have to manually split the text, do multiple requests to the API and concatenate the resulting audio into one audiofile.

All of this is handled by this package.

## Features
- Automatically split the SSML using the 5.000 character limit with the help ssml-split.
- Send and process the SSML using the Google Cloud Text to Speech API.
- Returns one single buffer to be processed into an audiofile or further processing.

**Important:** currently only handles `MP3` processing. Processing of `LINEAR16` and `OGG_OPUS` does not work yet. Feel free to send a PR.

## Requirements
- Google's NodeJS Text To Speech client: https://github.com/googleapis/nodejs-text-to-speech

## Example
1. Install using npm: `npm install google-text-to-speech-concat --save`

2. Make sure you already have setup the [NodeJS Text To Speech client](https://github.com/googleapis/nodejs-text-to-speech).

3. Use the `synthesize` method to process your SSML. Pass in your Text To Speech client as the first parameter.

