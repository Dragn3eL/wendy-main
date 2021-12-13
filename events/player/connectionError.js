module.exports = async(queue, error, client) => {

   console.log(client, queue, "An error occurred while playing,please be patient\n report it to support server `\w!support\`.", "RED");

    return  client.utils.sendErrorLog(client, { stack: `${error.message}`, name: "PLAYER_CONNECTION_ERROR", code: `${queue.id}` }, "error");
  }