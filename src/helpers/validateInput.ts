export default function validateInput(inputValue: string) {
    const spaces = checkSpaces(inputValue);

    if(!spaces){
        return 'spaces'
    }
    if (inputValue.length <= 2) {
        return '<2'
    } else if (inputValue.length >= 64) {
        return '>64'
    }

    function checkSpaces(str: string) {
        return str.trim() !== '';
    }

    return true;
}