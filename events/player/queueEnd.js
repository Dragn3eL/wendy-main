
module.exports = async(queue, client) => {

      return client.say.queueMessage(client, queue, "Finihsed playing the queue,add more to play \`w!p <song_name>\`");
};