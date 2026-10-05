const fixNewlines = (str) => str ? str.split(/\\\\n|\\n/).join('\n') : '';
console.log(fixNewlines("void bubbleSort() {\\n  foo;\\n}"));
