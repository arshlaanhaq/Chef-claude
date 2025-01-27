import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        await delay(1000);
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })

        if (response && response.choices && response.choices[0].message) {
            console.log(response)
            return response.choices[0].message.content
            
        } else {
            console.error('Invalid response format:', response)
        }
    } catch (err) {
        console.error('Error during API call:', err.message)    
    }
}
