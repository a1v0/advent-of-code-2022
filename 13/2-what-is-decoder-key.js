const { input } = require("./input");

const packetsStrings = input.split("\n\n");

const packets = packetsStrings.map((packetString) => {
    const splitPackets = packetString.split("\n");
    const packets = splitPackets.map((splitPacket) => {
        return eval(splitPacket);
    });
    return packets;
});

const allPacketsInOnePile = [];
packets.forEach((packet) => {
    allPacketsInOnePile.push(packet[0], packet[1]);
});

const firstDividerPacket = [[2]],
    secondDividerPacket = [[6]];
allPacketsInOnePile.push(firstDividerPacket, secondDividerPacket);

function comparePackets(leftPacket, rightPacket) {
    const loopLength =
        leftPacket.length > rightPacket.length
            ? leftPacket.length
            : rightPacket.length;

    for (let i = 0; i < loopLength; ++i) {
        // if one side has run out of numbers
        if (leftPacket[i] === undefined) return -1;
        else if (rightPacket[i] === undefined) return 1;
        // if both are numbers
        else if (
            typeof leftPacket[i] === "number" &&
            typeof rightPacket[i] === "number"
        ) {
            if (leftPacket[i] > rightPacket[i]) return 1;
            else if (leftPacket[i] < rightPacket[i]) return -1;
        }

        // if one is array
        else if (
            Array.isArray(leftPacket[i]) ||
            Array.isArray(rightPacket[i])
        ) {
            leftPacket[i] = Array.isArray(leftPacket[i])
                ? leftPacket[i]
                : [leftPacket[i]];

            rightPacket[i] = Array.isArray(rightPacket[i])
                ? rightPacket[i]
                : [rightPacket[i]];

            // run function recursively
            const result = comparePackets(leftPacket[i], rightPacket[i]);
            if (result !== undefined) return result;
        }
    }
}

allPacketsInOnePile.sort((left, right) => {
    return comparePackets(left, right);
});

const decoderKey =
    (allPacketsInOnePile.indexOf(firstDividerPacket) + 1) *
    (allPacketsInOnePile.indexOf(secondDividerPacket) + 1);

console.log(decoderKey);
