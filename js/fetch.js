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
                // console.log(data.assets);
                const html = data.assets.map(item => {
                    return `
                        <div id="entry">
                            <span id="entry-image">
                            <a href='${item.permalink}' target='_blank'><img src='${item.image_url}'></a>
                            </span>
                            <span id="entry-name">
                                Name: ${item.name}
                            </span>
                            <div id="entry-link">
                                Link: <a href='${item.permalink}' target='_blank'>${item.permalink}</a>
                            </div>
                            <div id="entry-desc">
                                Description: ${item.description}
                            </div>
                        </div>`
                })
                .join("");
                // console.log(html);
                // let ids = [];
                // let image_url = [];
                // let description = [];
            
                // for(let i = 0; i < response.assets.length; i++){
                    document
                        .querySelector("#infoBox")
                        .insertAdjacentHTML("afterbegin", html);
                    // ids.push(response.assets[i].id);
                    // image_url.push(response.assets[i].image_url);
                    // description.push(response.assets[i].description);
                // }
 
                // console.log(response.assets[0].id);
                // console.log(response.assets[4].description);
            })
            .catch(err => console.error(err));
    }
}


