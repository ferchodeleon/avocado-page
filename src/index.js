const baseUrl = 'https://platzi-avo.vercel.app';

const appNode = document.querySelector('#app');
appNode.className = 'appNode';

//Api INTl internacionalización, se usa para dar formato a fechas y monedas
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
    return newPrice;
}

//web api
// Conectarnos al servidor
window.fetch(`${baseUrl}/api/avo`)
//Procesar la respuesta y convertirla en JSON
.then(respuesta => respuesta.json())
//JSON -> Data -> Renderizar info en browser
.then((responseJson) => {
    const allItems = [];
    responseJson.data.forEach(item => {

        //Crear imagen
        const image = document.createElement('img');
        image.src = baseUrl+item.image;
        image.className = 'image-avo w-32';

        //Crear titulo
        const title = document.createElement('h2');
        title.textContent = item.name;
        title.className = 'title-avo text-xl';

        //Crear precio
        const price = document.createElement('div');
        price.textContent = formatPrice(item.price);
        price.className = 'price-avo';

        const container_detail = document.createElement('div');
        container_detail.append(title, price);
        container_detail.className = 'container-detail';

        const container = document.createElement('div');
        container.append(image, container_detail);
        container.className = 'container-avo justify-center items-center shadow-lg';

        allItems.push(container);
    });

    appNode.append(...allItems);
});