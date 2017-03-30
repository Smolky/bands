/**
 * document ready
 *
 * @package SuperTramp
 */

$(document).ready (function () {

    // Init vars
    var source_sample_data = 'https://smolky.github.io/xml-stack/topbands1-with-dtd.xml';
    var data = $('.data');
    var band_template = $('#band-template').html ().trim ();
    var member_template = $('#member-template').html ().trim ();
    
    
    // Tooltips
    $('[title]').tooltip ();
    
    
    // Check browser
    if ( ! $('html').hasClass ('localstorage')) {
        vex.dialog.alert ('Your browser doesn\'t support localStorage. What a pity! :(');
        return;
    }
    
    
    /**
     * load_from_json
     *
     * This function will load the JSON representation in 
     * the contenteditable form
     *
     * @param bands JSON
     *
     * @link http://stackoverflow.com/questions/15962713/adding-dom-elements-what-is-the-right-way
     *
     * @package SuperTramp
     */
     
    var load_from_json = function (bands) {
    
        // Init vars
        var html = '';
        
        
        // For each band object...
        $.each (bands, function (index, band) {
            
            // Clone the template
            var html_band = $(band_template);
            
            
            // Use HTML for efficiency
            var html_members = '';
            
            
            // Get Members
            $.each (band.members, function (index_member, member) {
                html_member = $(member_template);
                html_member.find ('.member-name').html (member);
                html_members += html_member[0].outerHTML;
            });
            
            
            // Change placeholders in our template
            html_band
                .find ('.band-title-ph').html (band.title).end ()
                .find ('.band-year-ph').html (band.year).end ()
                .find ('.band-members-ph').html (html_members)
            ;
            
            
            // Attach the new band
            html += html_band[0].outerHTML;
        });
        
        
        // Put the HTML code inside the data replacing 
        // the old content
        data.html (html);
    
    }
    
    
    // Bind data events
    // This way of binding items allows us to have
    // the events attached to the parent element so
    // when we add/remove elements inside we don't
    // need to reattach events.
    data.on ({
    
        // While typing we don't want to enter more
        // than one line, so we care about that
        keydown: function (e) {
        
            // Get clicked element
            var target = $(e.target);
        
        
            // Enter?
            if (e.keyCode == 13) {
                
                // Prevent default action
                e.preventDefault();
                
                
                // If any... go to the next content editable element
                target.next ('[contenteditable]').focus ();
            }
        },
        
        
        // Click events
        click: function (e) {
            
            // Get clicked element
            var target = $(e.target);
            
            
            // Fetch band context
            var band = target.closest ('.band');
            
            
            /**
             * Delete members
             *
             * @package Supertramp
             */
            if (target.hasClass ('delete-members-action')) {
                
                // Fetch members to delete
                var members_to_delete = band.find (':checked').closest ('li');
                
                
                // No members? No fun!
                if ( ! members_to_delete.length) {
                    vex.dialog.alert ('No band members has been selected');
                    return;
                }
                
                
                // Ensure it's the desire of the user
                vex.dialog.confirm ({
                    message: 'Are you sure to delete these members?',
                    callback: function (value) {
                        if ( ! value) {
                            return;
                        }
                        
                        members_to_delete.remove ();
                    }
                });
            }
            
            
            /**
             * Delete band
             *
             * @package Supertramp
             */
            if (target.hasClass ('delete-band-action') || target.closest ('.delete-band-action').length) {
            
                // Ensure it's the desire of the user
                vex.dialog.confirm ({
                    message: 'Are you sure to delete the whole band?',
                    callback: function (value) {
                        if ( ! value) {
                            return;
                        }
                        
                        band.remove ();
                    }
                });
            }
            
            
            /**
             * Create member
             *
             * Creates an empty template member ready to be 
             * completed
             *
             * @package Supertramp
             */
            if (target.hasClass ('create-member-action')) {
                band
                    .find ('.band-members-ph')
                        .append ($(member_template)[0].outerHTML)
                        .focus ()
                ;
            }
            
        }
    });
    
    
    /**
     * Create band
     *
     * Creates an empty template band ready to be 
     * completed
     *
     * @package Supertramp
     */
    $('.create-band-action').click (function (e) {
        data.append ($(band_template)[0].outerHTML);
    });
    
    
    // Store in database
    $('.store-in-database-action').click (function (e) {
        
        // Init vars
        var bands = [];
        
        
        // For each band...
        $('.band').each (function () {
            
            // Get me and data
            var self = $(this);
            var band_title = self.find ('.band-title-ph').html ();
            var band_year = self.find ('.band-year-ph').html ();
            
            
            // Validate
            if ( ! (band_title && band_year)) {
                return true;
            }
            
            
            // Get members
            var members = self.find ('.band-members-ph').find ('li').map (function (i, el) {
                return $(el).text().trim ();
            }).get();
            
            
            // Remove empty members
            members = members.filter (function (v) {return v!==''});
            
            
            // Create object
            bands.push ({
                'title': band_title,
                'year': band_year,
                'members': members
            });
        });
        
        
        // Store
        if ( ! bands.length) {
            vex.dialog.alert ("There is no one valid band to store. Date and title are requried.");
            return;
        }
        
        
        // Store in localStorage
        localStorage.setItem ('bands', JSON.stringify (bands));
    
    });
    
    
    /**
     * empty-database-action
     *
     * Empties the database
     *
     * @package SuperTramp
     */
    $('.empty-database-action').click (function (e) {
        localStorage.removeItem ('bands');
    });
    
    
    /**
     * Retrieve from database
     *
     * @package SuperTramp
     */

    $('.retrieve-from-database-action').click (function (e) {
        
        // Get from localstorage
        var bands = localStorage.getItem ('bands');
        
        
        // Check
        if ( ! bands) {
            vex.dialog.alert ("Nothing in the database");
            return;
        }
        
        
        // Parse
        load_from_json (JSON.parse (bands));
        

    });
    
    
    /**
     * Load sample data
     *
     * This functions uses an sample XML loaded
     * from previous assignments on a github 
     * project
     *
     * @package SuperTramp
     */
    // Load sample data
    $('.load-schema-action').click (function (e) {
    
        // Retrieve sample data
        $.get (source_sample_data, function (xml) {
            
            // Get bands
            var bands = $.xml2json (xml);
            
            
            // Retrieve important info
            bands = bands['#document'].bands.band;

            
            // Clean
            $.each (bands, function (index, band) {

                var members = $.map (band.members.member, function (member) {
                    return member.fullname;
                });
            
                band.members = members;
            });
            
            
            // Load data
            load_from_json (bands);

        });
    });

});