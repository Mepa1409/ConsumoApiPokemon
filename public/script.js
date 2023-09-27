async function getPokemons(id) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if (!respuesta.ok) {
            throw new Error('Respuesta de API no exitosa');
        }
        const datosPokemon = await respuesta.json();
        console.log(datosPokemon);

        const div1 = document.createElement('div');
        div1.classList.add("card", "m-4", "rounded", "bg-light", "cardPoke", "flip-card");
        div1.style.width = "18rem";

        const img = document.createElement('img');
        img.src = datosPokemon.sprites.front_default;
        img.classList.add("card-img-top", "magicpattern");

        const div2 = document.createElement('div');
        div2.classList.add("card-body");

        div1.append(img, div2);

        const h5 = document.createElement('h5')
        h5.classList.add("card-title", "bg-primary", "text-center")
        h5.textContent = datosPokemon.name.toUpperCase()

        const p = document.createElement('p')
        p.classList.add("carf-text", "text-center", "bg-primary")
        p.textContent = `#${datosPokemon.id.toString().padStart(3, 0)}`
        div2.append(p, h5)

        const containerColumns = document.getElementById('containerCards');

        const rows = containerColumns.querySelectorAll(".row");
        if (rows.length < 1) {
            const row = document.createElement("div");
            row.classList.add("row");
            containerColumns.append(row);
            for (let i = 0; i < 4; i++) {
                const column = document.createElement("div");
                column.classList.add("col");
                row.append(column);
            }
        }
        
        const columns = containerColumns.querySelectorAll(".col");
        for (let column of columns) {
            if (column.children.length < 10) {
                column.append(div1);
                break;
            }
        }


    } catch (error) {
        console.error('Error al obtener los pokemons:', error.message);
    }
}


function loadPokemon() {
    for (let i = 1; i <= 100; i++) {
        getPokemons(i)
    }


}