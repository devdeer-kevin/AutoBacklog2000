import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: 'OpenAI API key not configured, please follow instructions in README.md',
            },
        });
        return;
    }

    const backlog = req.body.requirement || '';
    if (backlog.trim().length === 0) {
        res.status(400).json({
            error: {
                message: 'Please enter a valid notes',
            },
        });
        return;
    }

    try {
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: generatePrompt(backlog),
            temperature: 0.6,
            max_tokens: 200,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                },
            });
        }
    }
}

function generatePrompt(backlog) {
    return `Please turn the following requirements based on my requirement engineering into a SCRUM backlog with features, user stories and their descriptions following the guide 'To [benefit], I would like as [role], the following [function]', formatted in Markdown: ${backlog}`;
}
