import chefClaudeLogo from "./images/chef-claude.png"

export default function Header() {
    return (
        <header>
            <img src={chefClaudeLogo}/>
            <h1>Chef Claude</h1>
        </header>
    )
}