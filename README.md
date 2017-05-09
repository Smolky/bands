# HTML 5, JQuery and Bootstrap
## Current Web trends 2016-17
### José Antonio García Díaz

### Introduction
This assignment consist in the creation of a Single Page Application to retrieve information from an external datasource and the ability to manage localdata

For this assignment I used a HTML5 Boiler template as a foundation combined with Twitter Bootstrap (v4) and others tools.

To the internal database I decided to use localStorage instead others stuff due the compatibility and simplicity to store an array of JSON objects.

To carry out the project I created a serie of HTML Templates using the template TAG. This way we can easily construct the content of the page without putting the HTML tags inside javascript strings.

Another interesting thing is the use of contenteditable tag to allow users to edit content direct from the tags without need to load all the content using forms. Anyway, contenteditable use is widely supported but for mobile devices maybe the form approach could be more suitable.

Structured data has been use to remark this application as a webpage

    <!-- Structured data -->
    <script type="application/ld+json">
    {
        "@context": "http://schema.org", 
        "@type": "WebSite",
        "author": "José Antonio García Díaz",
        "publisher": "Universidad de Murcia",
        "name": "Supertrump bands",
        "url": "https://smolky.github.io/bands/"
    }
    </script>   

As additional modification, microdata has been attached to the bands member using this format:

    <article class="band card" itemscope="" itemtype="http://schema.org/MusicGroup">
        <div class="card-block">
            <h4 class="card-title band-header">
                <span itemprop="name" class="band-title band-title-ph" contenteditable="true">bands-title</span>
                <small class="band-year band-year-ph" contenteditable="true">year</small>
            </h4>
                        
                        
            <!-- Meta -->
            <section>
                <p>
                    Here you can reference the band from an external source
                    like <a href="http://es.dbpedia.org/page/Angra" target="_blank">dbpedia</a>
                </p>
                <input 
                    class="band-same-as-ph" 
                    type="url" name="sameas" 
                    placeholder="same as..." 
                    value="band-same-as" />
             </section>
                        
            <!-- Members -->
            <section>
                <h3>
                    Members
                </h3>
                            
                <ul class="band-members band-members-ph">
                    <li>
                        <input type="checkbox">
                            <span 
                                itemscope="" 
                                itemtype="http://schema.org/Person" 
                                contenteditable="true" 
                                class="member-name" 
                                placeholder="name of the member">band-member-name</span>
                    </li>
                </ul>
            </section>
        </div>
    </article>

### Tutorial
You can view the project here:
https://smolky.github.io/bands/

Actions:
- *Load sample data.* Loads an sample XML file from the previous project hosted here: https://smolky.github.io/xml-stack/
The content is loaded using the $.get function and loaded back to JSON with xml2json. Additional normalization of the data has to be done.
- *Store in browser database.* Stores in localStorage a JSON representation of the data.
- *Retrieve from database.* Retrieves the last localStorage information.
- *Empty database.* Cleans the database

### Software used
- HTML5 Boilerplate
- Bootstrap 4.0.0.alpha6
- Google Font Loader
- XML2JSON (https://github.com/sparkbuzz/jQuery-xml2json)
- Vex dialogs

 
