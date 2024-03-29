const { input } = require("./input");

const packetsStrings = input.split("\n\n");

const packets = packetsStrings.map((packetString) => {
    const splitPackets = packetString.split("\n");
    const packets = splitPackets.map((splitPacket) => {
        return eval(splitPacket);
    });
    return packets;
});

const correctOrderIndices = [];

packets.forEach((packet, index) => {
    comparePackets(packet[0], packet[1], index);
});

const sumCorrectOrderIndices = correctOrderIndices.reduce(
    (total, currentIndex) => {
        return total + currentIndex + 1; // +1 because the indices are not zero-indexed
    },
    0
);

console.log(sumCorrectOrderIndices);

function comparePackets(leftPacket, rightPacket, index) {
    const loopLength =
        leftPacket.length > rightPacket.length
            ? leftPacket.length
            : rightPacket.length;
    for (let i = 0; i < loopLength; ++i) {
        // if one side has run out of numbers
        if (leftPacket[i] === undefined) {
            correctOrderIndices.push(index);
            return true;
        } else if (rightPacket[i] === undefined) return false;
        // if both are numbers, compare
        else if (
            typeof leftPacket[i] === "number" &&
            typeof rightPacket[i] === "number"
        ) {
            // if left > right, break without adding to counter
            if (leftPacket[i] > rightPacket[i]) return false;
            // if left < right, add to counter, then break
            else if (leftPacket[i] < rightPacket[i]) {
                correctOrderIndices.push(index);
                return true;
            }
        }

        // if one is array
        else if (
            Array.isArray(leftPacket[i]) ||
            Array.isArray(rightPacket[i])
        ) {
            // coerce other to array (if it isn't already an array)
            leftPacket[i] = Array.isArray(leftPacket[i])
                ? leftPacket[i]
                : [leftPacket[i]];
            rightPacket[i] = Array.isArray(rightPacket[i])
                ? rightPacket[i]
                : [rightPacket[i]];

            // run function recursively
            const result = comparePackets(leftPacket[i], rightPacket[i], index);
            if (result !== undefined) return result;
        }
    }
}
