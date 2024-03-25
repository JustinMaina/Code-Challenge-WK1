const prompt=require('prompt-sync')({sigint:true})
function calculateDemeritPoints(speed) {
    const speedLimit = 70;
    const kmPerDemeritPoint = 5;

    if (speed <= speedLimit) {
        console.log("Ok");
    } else {
        const kmAboveLimit = speed - speedLimit;
        const demeritPoints = kmAboveLimit / kmPerDemeritPoint;
        if (demeritPoints > 12) {
            console.log("License suspended");
        } else {
            console.log( `Points: ${demeritPoints}` );
        }
    }
}

const speed=parseInt(prompt("Enter speed: "))
calculateDemeritPoints(speed)


