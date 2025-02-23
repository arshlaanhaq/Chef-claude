import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromMistral } from "./ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)


    React.useEffect(() => {
        if (recipe != "" && recipeSection.current != null) {
            // recipeSection.current.scrollIntoView({ behavior: "smooth" })
            const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
            window.scroll({
                top: yCoord,
                behavior: "smooth"
            })
        }
    }, [recipe])


    React.useEffect(()=>{
        if(recipe != "" && recipeSection.current != null ){
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
     }, [recipe])
        async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient")
        if (newIngredient === null || newIngredient === "") {
            return
        }
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        event.target.reset();
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano(Min. 4 ingredients)"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
<<<<<<< HEAD
                    ref={recipeSection}
=======
                     ref={recipeSection}
>>>>>>> ac9ced5506863e565910effdc0614976ddff23cf
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}
