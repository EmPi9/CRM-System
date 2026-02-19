export default function ValidateInput(inputValue) {
    const spaces = checkSpaces(inputValue);

    if(!spaces){
        alert("Ошибка валидации. Введите пожалуйста название задачи заново.");
        return false
    }
    if (inputValue.length <= 2) {
        alert("Минимальная длина текста 2 символа");
        return false
    } else if (inputValue.length > 64) {
        alert("Максимальная длина текста 64 символа");
        return false
    }

    function checkSpaces(str) {
        return str.trim() !== '';
    }

    return true;
}