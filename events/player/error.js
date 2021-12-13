module.exports = async(queue, error, client) => {

   console.log(client, queue, "ERROR occurred while playing. Sorry for the inconveniences\n please report to support server \`w!support\`", "RED");

    return client.utils.sendErrorLog(client, { stack: `${error.message}`, name: "PLAYER_ERROR", code: `${queue.id}` }, "error");
};