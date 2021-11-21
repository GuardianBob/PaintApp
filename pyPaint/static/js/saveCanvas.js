var csrftoken = getCookie('csrftoken');

async function prepImage(){    
    const dT = new DataTransfer();
    const load = document.querySelector( "#id_image" );
    await canvas.toBlob( (blob) => {
        var name = document.getElementById('name').value;    
        const file = new File( [ blob ], `${name}.png` );
        // const dT = new DataTransfer();
        // const load = document.querySelector( "#id_image" );
        dT.items.add( file );
        // console.log(dT);
        load.files = null;
        load.files = dT.files;
        // document.querySelector( "#id_image" ).files = null;
        // document.querySelector( "#id_image" ).files = dT.files;              
    });    
    return await Promise.resolve(load);
}

function checkAllLoaded() {
    const load = document.querySelector( "#id_image" );
    if(load.files.length != 0) {
        console.log("Complete!");
        console.log(load.files.length);
    } else {
        console.log("waiting...")
        // prepImage();
    }
}

function saveImage(){
    const load = document.querySelector( "#id_image" );
    // while (load.files.length == 0) {
    //     prepImage(load);
    //     console.log(load.files.length);
    // }    
    prepImage().then(response => {
        console.log(response.files);
        if (response == true) {
            checkAllLoaded()
        }
    }
    
    )
    // console.log(load.files);

    // $('form').submit();
}

$('form').submit(function(){
    prepImage();
})