//allows javascript listeners to run only when content loaded
document.addEventListener('DOMContentLoaded', function(event) {

    /*************** Event Listeners ***************/
//Updates combined weight whenever input box clicked out of
    let elements = document.getElementsByTagName("input");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('blur', showCombined);
        elements[i].addEventListener('click', showCombined);
    }

//Updates combined weight whenever household number selection clicked out of
    document.getElementById('in_household').onchange = showCombined;

    /*************** Setting variables and value finders ***************/
//creating variables for each input field
    let plasticField = document.getElementById("in_bottles");
    let bagsField = document.getElementById("in_bags");
    let wrappingField = document.getElementById("in_wrapping");
    let yogurtField = document.getElementById("in_yogurt");
    let takeoutField = document.getElementById("in_takeout");
    let cupsField = document.getElementById("in_cups");
    let packagingField = document.getElementById("in_packaging");
    let detergentField = document.getElementById("in_detergent");
    let shampooField = document.getElementById("in_shampoo");
    let toothbrushesField = document.getElementById("in_toothbrushes");
    let toothpasteField = document.getElementById("in_toothpaste");
    let itemArray = [plasticField, bagsField, wrappingField, yogurtField, takeoutField, cupsField, packagingField, detergentField, shampooField, toothbrushesField, toothpasteField];

//function to find waste from a single field
    function findWaste(field) {
        return field.value * field.getAttribute("data-weight");
    }

//function to find householdSize input
    function findHouseHoldSize() {
        return document.getElementById("in_household").value;
    }

//Sets tips section to initially display no tips
    showRelevantTip();

    /*************** Calculating waste ***************/
//function to sum waste of all fields and divide by household size to find plastic footprint per person
    function calculateCombined() {
        let combinedWaste =
            findWaste(plasticField)
            + findWaste(bagsField)
            + findWaste(wrappingField)
            + findWaste(yogurtField)
            + findWaste(takeoutField)
            + findWaste(cupsField)
            + findWaste(packagingField)
            + findWaste(detergentField)
            + findWaste(shampooField)
            + findWaste(toothbrushesField)
            + findWaste(toothpasteField);
        return combinedWaste / findHouseHoldSize();
    }

//shows combined waste in plastic footprint paragraph
    function showCombined() {
        document.getElementById("total_per_year").innerHTML = calculateCombined();
        showRelevantTip();
    }

    /*************** Resetting page ***************/
//resets all elements
    let button = document.getElementById("reset");
    button.addEventListener('click', setWaste);

    function setWaste() {
        document.getElementById("in_bottles").value = 0;
        document.getElementById("in_bags").value = 0;
        document.getElementById("in_wrapping").value = 0;
        document.getElementById("in_yogurt").value = 0;
        document.getElementById("in_takeout").value = 0;
        document.getElementById("in_cups").value = 0;
        document.getElementById("in_packaging").value = 0;
        document.getElementById("in_detergent").value = 0;
        document.getElementById("in_shampoo").value = 0;
        document.getElementById("in_toothbrushes").value = 0;
        document.getElementById("in_toothpaste").value = 0;
        document.getElementById("in_household").value = 1;
        showCombined();
    }

    /*************** Setting relevant tip ***************/
//Function identifies tag ID of field with largest contribution to waste by weight
    function indexOfMax(arr) {

        //makes wasteArray to store information on how much each product wastes
        let wasteArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < arr.length; i++) {
            wasteArray[i] = findWaste(arr[i]);
        }

        //declaring maxIndex (index of field with largest waste)
        let maxIndex;

        if (Math.max.apply(Math, wasteArray) !== 0) { //Checks that maximum exists
            maxIndex = wasteArray.indexOf(Math.max.apply(Math, wasteArray)); //Finds index of maximum
            document.getElementById("biggest-category").innerHTML = itemArray[maxIndex].name;
        } else {
            maxIndex = -1; //Else sets to -1; i.e. no field is a maximum.
            document.getElementById("biggest-category").innerHTML = 'unknown sources';
        }

        return maxIndex;
    }

//Shows relevant tip according to indexOfMax
    function showRelevantTip() {

        for (let i = 0; i < itemArray.length; i++) {
            if (indexOfMax(itemArray) !== i) { //hides all tips that have not been identified as maximum contributor from indexOfMax function
                document.getElementsByClassName("tip")[i].style.display = 'none';
            } else { //shows any tip identified as maximum contributor
                document.getElementsByClassName("tip")[i].style.display = '';
            }
        }

    }

})