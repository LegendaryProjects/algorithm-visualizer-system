import pool from '../config/db.js';

export const getAlgorithms = async (req, res) => {
  try {
    const algosResult = await pool.query('SELECT * FROM algorithms');
    const inputsResult = await pool.query('SELECT * FROM algorithm_inputs ORDER BY sort_order');
    const templatesResult = await pool.query('SELECT * FROM algorithm_templates');

    const algorithms = algosResult.rows.map(algo => {
      // Find inputs for this algorithm
      const inputs = inputsResult.rows.filter(input => input.algorithm_id === algo.id);
      
      // Find templates for this algorithm
      const templates = templatesResult.rows.filter(template => template.algorithm_id === algo.id);
      
      // Structure the default input object
      const defaultInput = {};
      inputs.forEach(input => {
        if (input.input_type === 'array') {
          defaultInput[input.input_name] = input.default_value.split(',').map(n => parseInt(n.trim(), 10));
        } else if (input.input_type === 'number') {
          defaultInput[input.input_name] = parseInt(input.default_value, 10);
        } else {
          defaultInput[input.input_name] = input.default_value;
        }
      });

      // Structure templates object: { step_id: { explanation: "...", narration: "..." } }
      const templateMap = {};
      templates.forEach(t => {
        templateMap[t.step_id] = {
          explanation: t.explanation_template,
          narration: t.narration_template
        };
      });

      const fixNewlines = (str) => str ? str.split(/\\\\n|\\n/).join('\n') : '';

      return {
        id: algo.id,
        name: algo.name,
        category: algo.category,
        description: algo.description,
        complexity: algo.complexity,
        code: {
          cpp: fixNewlines(algo.code_cpp),
          java: fixNewlines(algo.code_java),
          python: fixNewlines(algo.code_python)
        },
        inputSchema: inputs.map(i => ({
          name: i.input_name,
          label: i.input_label,
          type: i.input_type,
          description: i.description
        })),
        defaultInput,
        templates: templateMap
      };
    });

    res.json(algorithms);
  } catch (err) {
    console.error("DB_ERROR:", err);
    res.status(500).send(err.message);
  }
};
