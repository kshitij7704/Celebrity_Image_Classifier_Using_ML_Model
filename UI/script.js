// Disable Dropzone's auto-discovery feature to allow manual initialization
Dropzone.autoDiscover = false;

// Function to initialize Dropzone and set up event listeners
function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });
    
    // Event listener for when a file is added to the dropzone
    dz.on("addedfile", function() {
        if (dz.files[1]!=null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    // Event listener for when a file upload is complete
    dz.on("complete", function (file) {
        let imageData = file.dataURL;
        
        var url = "http://127.0.0.1:5000/classify_image";

        // Sending a POST request to the backend service with the image data
        $.post(url, {
            image_data: file.dataURL
        },function(data, status) {
            console.log(data);
            if (!data || data.length==0) {
                $("#resultHolder").hide();
                $("#divClassTable").hide();                
                $("#error").show();
                return;
            }
            let players = ["lionel_messi", "shah_rukh", "saina_nehwal", "tom_cruise", "virat_kohli"];
            
            let match = null;
            let bestScore = -1;
            // Finding the best match with the highest probability score
            for (let i=0;i<data.length;++i) {
                let maxScoreForThisClass = Math.max(...data[i].class_probability);
                if(maxScoreForThisClass>bestScore) {
                    match = data[i];
                    bestScore = maxScoreForThisClass;
                }
            }
            // If a match is found, display the results
            if (match) {
                $("#error").hide();
                $("#resultHolder").show();
                $("#divClassTable").show();
                $("#resultHolder").html($(`[data-player="${match.class}"`).html());
                let classDictionary = match.class_dictionary;
                for(let personName in classDictionary) {
                    let index = classDictionary[personName];
                    let proabilityScore = match.class_probability[index];
                    let elementName = "#score_" + personName;
                    $(elementName).html(proabilityScore);
                }
            }
        });
    });

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();		
    });
}

// When the document is ready, hide error and result sections, and initialize Dropzone
$(document).ready(function() {
    console.log( "ready!" );
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();

    init();
});