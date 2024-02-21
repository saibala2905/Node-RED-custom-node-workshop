module.exports = function(RED) {
    function LowerCaseNodevivek(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg){
            msg.payload = msg.payload.toUpperCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("lower-case-vivek",LowerCaseNodevivek);
}