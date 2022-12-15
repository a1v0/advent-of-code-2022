const { testInput: input } = require("./input");

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

// create array to store indexes of items in correct order
const correctOrderIndices = [];

console.log(packets);

// create compare function take takes two arrays and index+1 as argument
function comparePackets(leftPacket, rightPacket, index) {
    // // if both are numbers, compare
    // // // if left > right, break without adding to counter
    // // // if left < right, add to counter, then break
    // // // else continue
    // // if one is array
    // // // coerce other to array (if it isn't already an array)
    // // // run function recursively, returning something (what/how?) if the tests fail/pass
}

// loop through packets invoking the compare function each time
packets.forEach((packet, index) => {
    comparePackets(packet[0], packet[1], index);
});

// count indices of arrays in the right order
const sumCorrectOrderIndices = correctOrderIndices.reduce(
    (total, currentIndex) => {
        return total + currentIndex + 1; // +1 because the indices are not zero-indexed
    },
    0
);
console.log(sumCorrectOrderIndices);
