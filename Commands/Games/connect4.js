const Discord = module.require("discord.js");
const { Connect4 } = require('discord-gamecord')

module.exports = {
  name: "connect4",
  description: "connect4 in discord!",
  run: async (client, message, args) => {
          new Connect4({
        message: message,
        opponent: message.mentions.users.first(),
        embed: {
          title: 'Connect 4',
          color: '#5865F2',
        },
        emojis: {
          player1: '<:maron_circ:906010350632181771>',
          player2: '<:purp_cicle:906010352632877086>'
        },
        turnMessage: '{emoji} | Its now **{player}** turn!',
        winMessage: '{emoji} | **{winner}** won the game! (* ^ ω ^)',
        gameEndMessage: 'The game went unfinished (っ˘̩╭╮˘̩)っ',
        drawMessage: 'It was a draw! (•ิ_•ิ)? ',
        askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Connect 4! (; -_-)――――――C<―_-) ',
        cancelMessage: 'Looks like they refused to have a game of Connect4. (x_x)',
        timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
      }).startGame();
  },
};
