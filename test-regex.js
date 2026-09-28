const str = "foo\\nbar";
console.log("Original:", str);
console.log("Replaced:", str.replace(/\\n/g, '\n'));
