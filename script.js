//varibales to hold choices and textArea id elements
const choices = document.getElementById('choices');
const textArea = document.getElementById('textArea');
//set it so that the text area on the webpage will automatically be focused when the page loads
textArea.focus();
//listening for when the user lifts off of any key (while typing in the text area)
textArea.addEventListener('keyup', (e)=> {
    createChoices(e.target.value);//calling createChoices function

    if(e.key === 'Enter'){//if the key that was lifted was the enter key
        setTimeout(() =>{
            e.target.value = '';
        }, 100);
        selectRandomChoice();//select a random choice for the user
    }
});

//function that takes the value of the event's target
function createChoices(input){
    console.log(input);
    //creating an array of choices that has white spaces trimmed on both sides
    const choicesList = input.split(',').filter(choice=> choice.trim() !== '').map(choice => choice.trim());

    console.log(choicesList);

    choices.innerHTML  = '';//clearing so that choices dont get flooded with redundancy
    choicesList.forEach(choice => {//for every choice in choicesList, we:
        const choiceElement = document.createElement('span');//1. create a span tag for it
        choiceElement.classList.add('choice');//2. add the class 'choice' to it
        choiceElement.innerText = choice;//3. make the inner text of the span tag equal to current choice
        choices.appendChild(choiceElement);//4. append child

    })
}
//function that will select a random choice, animation included
function selectRandomChoice(){
    console.log('Enter key was pressed');//Professional level debugging skills

    const duration = 50;//varible that dertermines how long the animation duration will be
    const interval = setInterval(() => {//variable for the intervals between function calls
        const randomChoice = pickRandomChoice();//pick a random choice
        highlight(randomChoice);//highlight the random choice
        setTimeout(() => {
            unHighlight(randomChoice);//unhighlight the choice
        }, 100);
    }, 100);//this animation will continue 
    setTimeout(() => {
        clearInterval(interval);//puts a stop to the animation above
        setTimeout(() => {
            const randomChoice = pickRandomChoice();//after the last choice is unhighlighted, pick the final random choice
            highlight(randomChoice);//highlight it and dont unhighlight, indicating to the user that the animation is over and their random choice has been selected
        }, 100);
    }, duration * 100);//50 * 100 = 5000ms (aka 5s)
}
//function that will randomly select a choice from the array of choices
function pickRandomChoice(){
    const choices = document.querySelectorAll('.choice');//make array of 'choices' by querying for all tags with the class 'choice'
    return choices[Math.floor(Math.random() * choices.length)];//return the value of a  random index of 'choices'
}
//funtion that will take choice tag as a parameter and will add class highlight to said tag
function highlight(choice){
    choice.classList.add('highlight');//add class of highlight to choice
}
//function that will take choice tag as a parameter and will remove class highlight from said tag 
function unHighlight(choice){
    choice.classList.remove('highlight');//remove class of highlight to choice
}