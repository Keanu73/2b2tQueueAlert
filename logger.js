/* Copyright (c) 2019 Keanu73 / 2b2tQueueAlert
/* Original copyright (c) 2018 YorkAARGH (https://github.com/AnIdiotsGuide/guidebot)
/* All rights reserved.
/*
MIT License

Copyright (c) 2018 YorkAARGH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
/*

/*
Logger class for easy and aesthetically pleasing console logging 
*/
const chalk = require("chalk")
const moment = require("moment")

exports.log = (content, type = "log") => {
	const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`
	switch (type) {
		case "log": {
			return console.log(`${timestamp} ${chalk.bgBlue(`[${type.toUpperCase()}]`)} ${content} `)
		}
		case "warn": {
			return console.log(`${timestamp} ${chalk.black.bgYellow(`[${type.toUpperCase()}]`)} ${content} `)
		}
		case "error": {
			return console.log(`${timestamp} ${chalk.bgRed(`[${type.toUpperCase()}]`)} ${content} `)
		}
		case "debug": {
			return console.log(`${timestamp} ${chalk.green(`[${type.toUpperCase()}]`)} ${content} `)
		}
		case "cmd": {
			return console.log(`${timestamp} ${chalk.black.bgWhite(`[${type.toUpperCase()}]`)} ${content}`)
		}
		case "ready": {
			return console.log(`${timestamp} ${chalk.black.bgGreen(`[${type.toUpperCase()}]`)} ${content}`)
		}
		default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.")
	}
}

exports.error = (...args) => this.log(...args, "error")

exports.warn = (...args) => this.log(...args, "warn")

exports.debug = (...args) => this.log(...args, "debug")

exports.cmd = (...args) => this.log(...args, "cmd")
