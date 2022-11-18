#!/usr/bin/env node

const { execSync } = require('child_process')

const tmi = require('tmi.js')

const colors = [
  'Blue',
  'BlueViolet',
  'CadetBlue',
  'Chocolate',
  'Coral',
  'DodgerBlue',
  'Firebrick',
  'GoldenRod',
  'Green',
  'HotPink',
  'OrangeRed',
  'Red',
  'SeaGreen',
  'SpringGreen',
  'YellowGreen',
]

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: execSync(
      `security find-generic-password \
            -w -a alan -s alan--twitch--TheIdOfAlan--client-id--2022-11-17`
    )
      .toString()
      .trim(),
    password: execSync(
      `security find-generic-password \
            -w -a alan -s alan--twitch--TheIdOfAlan--oauth-token--2022-11-17`
    )
      .toString()
      .trim(),
  },
  channels: ['chrissiecodes'],
})

client.connect()

client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  if (self) return

  console.log(message)
  console.log(tags.username)

  if (tags.username === `theidofalan`) {
    const new_color = colors[Math.floor(Math.random() * colors.length)]
    client.say(channel, `/color ${new_color}`)
  }
})
