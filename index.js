import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { parseFormText } from './parser/parseFormText.js';
import { generateTestCases } from './services/genrateTestCases.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API Running');
});

app.post('/generate-from-text',(req,res)=>{
    const {text} = req.body;

    if(!text){
        return res.status(400).json({
            success: false,
            message: 'Text is required'
        });
    }

    // parse

    const schema = parseFormText(text);

    // genrate test cases
    const testCases = generateTestCases(schema.fields);
    const fieldNames = schema.fields.map(field => field.name);

    res.json({
        success: true,
        message: 'Output generated successfully',
        fieldsMessage: `Yeh fields hain: ${fieldNames.join(', ') || 'No fields found'}`,
        testCasesMessage: `Yeh test cases hain: ${testCases.length} generated`,
        schema,
        count: testCases.length,
        data : testCases
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
