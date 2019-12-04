
const countPasswords = (low, high) => {
    const passwords = [];

    for (let password = low; password < high; password++) {
        let chars = password.toString();
        if (!alwaysIncreasing(chars)) {
            continue;
        }

        if (!hasTwoAdjacentDigits(chars)) {
            console.log("skpping", password);
            continue;
        }
        
        passwords.push(password);
    }

    return passwords.length;
}

const alwaysIncreasing = (chars) => {
    for (let i = 0; i < chars.length - 1; i++) {
        if (chars[i] > chars[i+1]) {
            return false;
        }
    }
    return true;
}

const hasTwoAdjacentDigits = (chars) => {
    for (let i = 0; i < chars.length - 1; i++) {
        if (chars[i] == chars[i+1]) {
            return true;
        }
    }
    return false;
}

console.log("possible passwords", countPasswords(372304, 847060));
