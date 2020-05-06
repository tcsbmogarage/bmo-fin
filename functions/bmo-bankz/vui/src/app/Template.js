'use strict'
const path = require('path');
const pug = require('pug-ssml');
const CachePugTemplates = require('cache-pug-templates');
const fs = require('fs')

const Template = {
     speechFileSuffix: "-ssml.js",
     rootPath: "speech",
     templatePath: "speech/templates",
     Cache: {},
     Engine: {},
     Map: {},
     GetAll(){
        return pug.cache;
     },
     StartCache(locales){
        let speech = path.join(__dirname, '../speech/templates/en-ca');
        this.Cache = new CachePugTemplates({speech});
        console.log(this.Cache);
        this.Cache.start();
     },
     Initialize(locale){
        let custom = {};
        custom["help"] = this.Engine["help"];
        custom[locale] = this.Engine[locale];
        return custom;
     },
     Load(locale){
        let obj = {};
        let speechFile = `./${this.rootPath}/${locale}${this.speechFileSuffix}`;
        let templatePath = `./${this.templatePath}/${locale}/`;
        try {
            if (!fs.existsSync(speechFile)) {
                pug.precompile(templatePath, {
                    basedir: './speech/templates',
                    file: speechFile,
                    pretty: false
                })
            }
        } catch(err) {
            console.error(err)
        }
        obj = require("." + speechFile);
        this.Map[locale] = path.join(__dirname, `../${this.templatePath}/${locale}/`); 
        this.Engine[locale] = obj;
        return obj;
    }
};

module.exports = Template;