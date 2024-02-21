// module.exports = function(RED) {
//     function MachineDataNode(config) {
//         RED.nodes.createNode(this,config);
//         var node = this;
//         node.on('input', function(msg) {
//             msg.payload = msg.payload;
//             if (config.analysis === "Efficiency") {
//                 node.send(msg);
//             }

//             if (config.analysis === "Performance") {
//                 node.send(msg);
//             }

//             if (config.analysis === "Quality") {
//                 node.send(msg);
//             }

//         })
//     }
//     RED.nodes.registerType("machine-data",MachineDataNode);
// }
module.exports = function (RED) {
    function MachineDataNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            // Example payload structure: { "SHOT_COUNT": 747, "TIMESTAMP": 1708499315148.0, "ACTUAL_CYCLE_TIME": "29.02" }
            // Note: Adjust the payload structure and calculation logic based on your actual data and analysis requirements.

            switch (config.analysis) {
                case "Efficiency":
                    // Calculate efficiency
                    // Assuming functions calculateEfficiency exists and works with the given payload
                    msg.payload.efficiency = calculateEfficiency(msg.payload, config.standardCycleTime, config.shiftDuration);
                    break;
                case "Performance":
                    // Calculate performance metrics
                    // Assuming a function calculatePerformance exists
                    msg.payload.performance = calculatePerformance(msg.payload);
                    break;
                case "Quality":
                    // Calculate quality metrics
                    // Assuming a function calculateQuality exists
                    msg.payload.quality = calculateQuality(msg.payload);
                    break;
                default:
                    // If analysis type is not recognized, do not modify payload
                    node.warn("Unknown analysis type");
            }

            node.send(msg); // Send the modified message onwards in the flow
        });
    }

    // Register the node type
    RED.nodes.registerType("machine-data", MachineDataNode);

    // Example calculation functions (implement these based on your actual logic)
    function calculateEfficiency(payload, standardCycleTime, shiftDuration) {

        // Extract necessary values from the payload
        const actualCycleTime = parseFloat(payload.ACTUAL_CYCLE_TIME); // Ensure this is a number
        const shotCount = parseInt(payload.SHOT_COUNT, 10); // Ensure this is an integer

        // Convert standardCycleTime and shiftDuration from string to number if necessary
        const standardCycleTimeSeconds = parseFloat(standardCycleTime);
        const shiftDurationSeconds = parseFloat(shiftDuration) * 3600; // Assuming shiftDuration is in hours, convert to seconds

        // Calculate the expected shot count based on standard cycle time and shift duration
        const expectedShotCount = shiftDurationSeconds / standardCycleTimeSeconds;

        // Calculate efficiency as a percentage
        const efficiency = (shotCount / expectedShotCount) * 100;

        return efficiency.toFixed(2); // Return efficiency as a string with two decimal places

    }

    function calculatePerformance(payload) {
        return 90;
    }

    function calculateQuality(payload) {
        // Mock implementation, replace with actual logic
        return 90; // Placeholder value
    }
}