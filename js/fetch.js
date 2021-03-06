async function fetchinfo() 
{
    document.getElementById("infoBox").innerHTML = "";
    var addy = document.getElementById("address").value;
    var isValid = true;

    if (addy.toLowerCase().indexOf("0x") === -1) { //if address is invalid
        document.getElementById("infoBox").innerHTML = "<h6>Error: Invalid Address</h6>";
        isValid = false;
    
    } else { //if address is 'valid' run this section
        const options = {method: 'GET', headers: {'X-API-KEY': '67a3d12d17fe42c0af7f1280d994a2d6'}};  //supply api key via header
        fetch('https://api.opensea.io/api/v1/assets?owner=' + addy + '&order_direction=desc&offset=0&limit=20', options)
            .then(response => response.json())
            .then(data => {
                console.log(data.assets);
                const html = data.assets.map(item => {
                    return `
                    <div id="entry">
                        <div id="entry-basics">
                            <span id="entry-image">
                                <a href='${item.permalink}' target='_blank'><img src='${item.image_url}'></a>
                            </span>
                            <span id="entry-details">
                                <div id="entry-name">
                                    <a href='${item.permalink}' target='_blank'>${item.name}</a>
                                </div>
                                <div id="entry-collection-name">
                                    Collection: ${item.collection.name}
                                </div>
                                <div id="entry-project-homepage">
                                    Project Home: <a href='${item.permalink}' target='_blank'>${item.collection.external_url}</a>
                                </div>
                            </span>
                        </div>
                    </div>
                    `
                })
                .join("");
                document
                    .querySelector("#infoBox")
                    .insertAdjacentHTML("afterbegin", html);
            })
            .catch(err => console.error(err));
    }
}


