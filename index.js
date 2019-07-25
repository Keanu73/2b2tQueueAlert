/*
/* Copyright (c) 2019 Keanu73 / 2b2tQueueAlert
/* All rights reserved.
*/

const WebSocket = require("ws")
const logger = require("./logger.js")
const notifier = require("node-notifier")
const path = require("path")
const moment = require("moment")
require("moment-duration-format")
const open = require("open")
const config = require("./config.js")

let ws
function startWebSocket() {
	ws = new WebSocket("wss://2b2t.io/ws")

	ws.addEventListener("error", (err) => {
		logger.error(`WebSocket: ${err.message}`)
		setTimeout(() => {
			startWebSocket()
			logger.log("2b2t.io: Reconnected")
		}, 5000)
	})

	ws.on("message", async (data) => {
		logger.log(`2b2t.io: ${data}`)
		if (data === "1") ws.send("2")
		else {
			data = JSON.parse(data)
			const lastChecked = data[0]
			const players = data[1]
			if (players < config.playerThreshold) {
				logger.log(`There are less than ${players} players in the queue!\nLast checked ${moment.duration(moment().unix() - lastChecked, "seconds").format("m [minutes] [ago], s [seconds] [ago]")}`)
				if (config.notification) notifyUser(players, lastChecked)
			} else {
				logger.log(`${players} players in the queue, last checked ${moment.duration(moment().unix() - lastChecked, "seconds").format("m [minutes] [ago], s [seconds] [ago]")}`)
			}
		}
	})

	ws.on("open", () => logger.log("2b2t.io: Connected"))
	ws.on("close", function clear() {
		logger.log("2b2t.io: Connection Closed, Reconnecting...")
		setTimeout(() => {
			startWebSocket()
			logger.log("2b2t.io: Reconnected")
		}, 5000)

	})
}

function notifyUser(playerNumber, lastChecked) {
	notifier.notify(
		{
			title: "2b2t queue alert",
			message: `There are less than ${playerNumber} players in the queue!\nLast checked ${moment.duration(moment().unix() - lastChecked, "seconds").format("m [minutes] [ago], s [seconds] [ago]")}`,
			icon: path.join(__dirname, "2b2t.png"), // Absolute path (doesn't work on balloons)
			sound: true, // Only Notification Center or Windows Toasters
			wait: true, // Wait with callback, until user action is taken against notification
			appID: "Made by Keanu73"
		}
	)

	notifier.on("click", function (_notifierObject, _options) {
		open("https://2b2t.io").then(() => logger.log("Opened URL (https://2b2t.io)")).catch(err => logger.error(err))
	})
}

startWebSocket()