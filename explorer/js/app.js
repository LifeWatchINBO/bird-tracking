// -------------------------
// Fetch data from cartodb
// -------------------------

// general function to fetch data given a url
function fetchTrackingData(url) {
    var result = jQuery.get(url, function(data) {
        jQuery('.result').html(data);
    });
    return result;
}

// function to fetch all birds in the bird_tracking_devices table
function fetchBirdData() {
    query = "SELECT bird_name, device_info_serial, sex, scientific_name from bird_tracking_devices";
    var url = "https://lifewatch-inbo.cartodb.com/api/v2/sql?q=" + query;
    return fetchTrackingData(url);
}

// -------------------------
// app function will contain
// all functionality for the
// app
// -------------------------
var app = function() {
    var birds_call = fetchBirdData();
    var birds = [];
    birds_call.done(function(data) {
        birds = _.sortBy(data.rows, function(bird) {return bird.scientific_name + bird.bird_name});
        addBirdsToSelect()
    })

    function addBirdsToSelect() {
        // create optgroups per species
        all_species = _.map(birds, function(bird){ return bird.scientific_name });
        species = _.uniq(all_species, true);
        opt_groups = {};
        _.each(species, function(spec_name){ opt_groups[spec_name] = "<optgroup label=\"" + spec_name +"\">"});

        // append bird names to the correct optgroups
        for (var i=0;i<birds.length;i++) {
            opt = "<option value\"" + i + "\">" + birds[i].bird_name + "</option>";
            opt_groups[birds[i].scientific_name] += opt;
        }

        // create one html text with all the optgroups and their options
        optgrp_html = "";
        _.each(opt_groups, function(optgrp, spec_name){ optgrp_html += optgrp + "</optgroup>"});

        // append the optgroups html to the select-bird element
        $("#select-bird").append(optgrp_html);
    }
}();
