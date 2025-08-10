import express from 'express';
import { exec } from 'child_process';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/run-test', (req, res) => {
    const testName = req.query.test as string; // Get the test parameter from the query string

    if (!testName) {
        return res.status(400).send('Test name is required.');
    }

    // Construct the command to run the specific test
    exec(`npx playwright test ${testName}.spec.ts --project=chromium --reporter=list`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing tests: ${error.message}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`Test stderr: ${stderr}`);
            return res.status(500).send(`Test stderr: ${stderr}`);
        }
        console.log(`Test stdout: ${stdout}`);
        res.send(`Tests executed successfully:\n${stdout}`);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});