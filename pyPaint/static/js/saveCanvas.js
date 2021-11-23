// var csrftoken = getCookie('csrftoken');

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
        // prepImage(); // this causes a continuous loop and crashes the app
    }
}

$('#canvas_save').on('click', function(){
    var name=document.getElementById("name").value;
    console.log(name);
    if(name !== '') {
        prepImage();
        $('#modal_update').hide();
        $('#modal_save').show();
    }else{
        $('#modal_update').show();
        $('#modal_save').hide();
    };
})

function saveImage(){
    prepImage();
    $('#modal_update').hide();
    $('#modal_save').show();
}

// $('form').submit(function(){
//     // prepImage();
//     $('#modal_update').show();
//     $('#modal_save').hide();
// })

$('#exampleModal').on('hidden.bs.modal', function () {
    $('#modal_update').show();
    $('#modal_save').hide();
})

$('.delete').on('click', function(){
    var img_id = $(this).attr('img_id');
    document.getElementById('modal_delete').onclick=function(){remove_image(img_id)};
})

function remove_image(img_id) {
    $.ajax({
        url: "/remove/" + img_id + "",
        success: function (response){   
            console.log(response);
            // var images = response['images'];
            $(`#image_${img_id}`).remove();
            
            return response
        // },
        // error: function (response) {
        //     // alert the error if any error occured
        //     console.log(response.responseJSON.errors)
        }
    });
}
