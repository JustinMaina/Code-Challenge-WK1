const prompt=require('prompt-sync')({sigint:true})

function studentMarks (marks) {
    if(marks > 79) {
        console.log("A");
    } 
    else if(marks >= 60 && marks <= 79) {
        console.log("B");
    } 
    else if(marks >= 50 && marks <= 59) {
        console.log("C");
    } 
    else if(marks >= 40 && marks <= 49) {
        console.log("D");
    } 
    else {
        console.log("E");
    }
    
}
const marks=parseInt(prompt("Enter marks: ")) 
if(marks>=0 && marks<=100){
    studentMarks(marks)
}
else{
    console.log("Invalid")
}
