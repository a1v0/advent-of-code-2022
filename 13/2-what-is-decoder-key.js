const { input } = require("./input");

// split input into pairs of strings
const packetsStrings = input.split("\n\n");

// map pairs into an array of arrays, using eval()
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

// create compare function take takes two arrays
function comparePackets(leftPacket, rightPacket) {
    const loopLength =
        leftPacket.length > rightPacket.length
            ? leftPacket.length
            : rightPacket.length;
    for (let i = 0; i < loopLength; ++i) {
        // if one side has run out of numbers
        if (leftPacket[i] === undefined) return -1;
        else if (rightPacket[i] === undefined) return 1;
        // if both are numbers, compare
        else if (
            typeof leftPacket[i] === "number" &&
            typeof rightPacket[i] === "number"
        ) {
            // if left > right, break without adding to counter
            if (leftPacket[i] > rightPacket[i]) return 1;
            // if left < right, add to counter, then break
            else if (leftPacket[i] < rightPacket[i]) return -1;
            // else continue
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
            const result = comparePackets(leftPacket[i], rightPacket[i]);
            if (result !== undefined) return result;
        }
    }
}

// loop through packets invoking the compare function each time
allPacketsInOnePile.sort((left, right) => {
    return comparePackets(left, right);
});
console.log(
    (allPacketsInOnePile.indexOf(firstDividerPacket) + 1) *
        (allPacketsInOnePile.indexOf(secondDividerPacket) + 1)
);
