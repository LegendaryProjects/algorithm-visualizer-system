const fs = require('fs');

let sql = fs.readFileSync('init_neon.sql', 'utf8');

// Remove \restrict commands
sql = sql.replace(/^\\restrict.*\n/gm, '');
sql = sql.replace(/^\\unrestrict.*\n/gm, '');

// Convert COPY to INSERT
function parseCopyData(lines, tableName, columns) {
    const inserts = [];
    for (let line of lines) {
        if (line === '\\.') break;
        if (!line.trim()) continue;
        
        const values = line.split('\t').map(val => {
            if (val === '\\N') return 'NULL';
            // unescape standard pg_dump escapes
            val = val.replace(/\\b/g, '\b')
                     .replace(/\\f/g, '\f')
                     .replace(/\\n/g, '\n')
                     .replace(/\\r/g, '\r')
                     .replace(/\\t/g, '\t')
                     .replace(/\\v/g, '\v')
                     .replace(/\\\\/g, '\\');
            // escape quotes for SQL string
            val = val.replace(/'/g, "''");
            return `'${val}'`;
        });
        inserts.push(`INSERT INTO ${tableName} (${columns}) VALUES (${values.join(', ')});`);
    }
    return inserts.join('\n');
}

const finalLines = [];
const lines = sql.split('\n');
let i = 0;

while (i < lines.length) {
    const line = lines[i];
    const copyMatch = line.match(/^COPY (public\.[a-zA-Z_]+) \((.+)\) FROM stdin;/);
    if (copyMatch) {
        const tableName = copyMatch[1];
        const columns = copyMatch[2];
        i++;
        const dataLines = [];
        while (i < lines.length && lines[i] !== '\\.') {
            dataLines.push(lines[i]);
            i++;
        }
        if (lines[i] === '\\.') {
            dataLines.push('\\.');
        }
        finalLines.push(parseCopyData(dataLines, tableName, columns));
    } else {
        finalLines.push(line);
    }
    i++;
}

fs.writeFileSync('init_neon.sql', finalLines.join('\n'));
console.log("Converted COPY to INSERT successfully.");
