const wordCount = (words) => {
    const wordLength = words.split(" ").length;
    return Math.ceil(wordLength/200);
}